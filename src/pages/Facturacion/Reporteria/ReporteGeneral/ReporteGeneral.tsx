import { useMemo, useState } from "react";
import SummarizeIcon from '@mui/icons-material/Summarize';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Row = {
    ingresoCaja: number;
    fecha: string; // yyyy-mm-dd
    cedula: string;
    paciente: string;
    cajero: string;
    total: number;
};

const sampleData: Row[] = [
    { ingresoCaja: 5001, fecha: "2025-08-01", cedula: "0912345678", paciente: "JUAN PEREZ", cajero: "CARLOS", total: 120.0 },
    { ingresoCaja: 5002, fecha: "2025-08-02", cedula: "0923456789", paciente: "MARIA LOPEZ", cajero: "ANA", total: 250.5 },
    { ingresoCaja: 5003, fecha: "2025-08-03", cedula: "0934567890", paciente: "PEDRO GOMEZ", cajero: "LUIS", total: 75.0 },
];

export default function ReporteGeneral() {
    const today = new Date().toISOString().slice(0, 10);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const [from, setFrom] = useState<string>(weekAgo);
    const [to, setTo] = useState<string>(today);
    const [fCaja, setFCaja] = useState<string>("");
    const [reportName, setReportName] = useState<string>("REPORTE GENERAL DE ABONOS");
    const [filtered, setFiltered] = useState<Row[] | null>(null);
    const [openPreview, setOpenPreview] = useState(false);

    const up = (s?: string | number) => (s === undefined || s === null ? "" : String(s).toUpperCase());

    const handleView = () => {
        const fromDt = new Date(from);
        const toDt = new Date(to);
        const res = sampleData.filter(r => {
            const d = new Date(r.fecha);
            if (d < fromDt || d > toDt) return false;
            if (fCaja && !r.cajero.toLowerCase().includes(fCaja.toLowerCase())) return false;
            return true;
        });
        setFiltered(res);
    };

    const rows = filtered ?? sampleData.filter(r => {
        const d = new Date(r.fecha);
        return d >= new Date(from) && d <= new Date(to) && (!fCaja || r.cajero.toLowerCase().includes(fCaja.toLowerCase()));
    });

    const totals = useMemo(() => {
        return rows.reduce(
            (acc, r) => {
                acc.total += r.total;
                return acc;
            },
            { total: 0 }
        );
    }, [rows]);

    const exportCsv = () => {
        const headers = ["Encabezado", "Nombre reporte", "Desde", "Hasta", "Nombre caja", "No. Ingreso Caja", "Fecha", "Cédula", "Nombre paciente", "Cajero", "Total"];
        const csv = [
            headers.join(","),
            ...rows.map(r =>
                [
                    `"${reportName}"`,
                    `"${reportName}"`,
                    from,
                    to,
                    `"${fCaja}"`,
                    r.ingresoCaja,
                    r.fecha,
                    `"${r.cedula}"`,
                    `"${r.paciente}"`,
                    `"${r.cajero}"`,
                    r.total.toFixed(2),
                ].join(",")
            ),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `reporte_abonos_${from}_a_${to}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const doPrint = () => window.print();

    return (
        <Box sx={{ p: 3, textTransform: "uppercase" }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1A3C6D", fontWeight: "bold" }}>
                <SummarizeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                {up("Reporte general de abonos")}
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <TextField label={up("Nombre de reporte")} size="small" value={reportName} onChange={e => setReportName(e.target.value)} />
                    <TextField label={up("Desde")} type="date" size="small" value={from} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} />
                    <TextField label={up("Hasta")} type="date" size="small" value={to} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} />
                    <TextField label={up("Nombre caja")} size="small" value={fCaja} onChange={e => setFCaja(e.target.value)} />
                </Stack>

                <Box sx={{ display: "flex", gap: 1, mt: 2, alignItems: "center", flexWrap: "wrap" }}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleView}
                        sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
                    >
                        {up("Ver")}
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        onClick={exportCsv}
                        sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
                    >
                        {up("Exportar")}
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setOpenPreview(true)}
                        sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
                    >
                        {up("Imprimir")}
                    </Button>

                    <Button
                        size="small"
                        variant="text"
                        onClick={() => window.history.back()}
                        sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
                    >
                        {up("Cerrar")}
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{up("No. Ingreso Caja")}</TableCell>
                            <TableCell>{up("Fecha")}</TableCell>
                            <TableCell>{up("Cédula")}</TableCell>
                            <TableCell>{up("Nombre paciente")}</TableCell>
                            <TableCell>{up("Cajero")}</TableCell>
                            <TableCell align="right">{up("Total")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>{r.ingresoCaja}</TableCell>
                                <TableCell>{r.fecha}</TableCell>
                                <TableCell>{r.cedula}</TableCell>
                                <TableCell>{up(r.paciente)}</TableCell>
                                <TableCell>{up(r.cajero)}</TableCell>
                                <TableCell align="right">{r.total.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>{up("Totales")}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.total.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Typography variant="body2"><b>{up("Total recaudado")}:</b> {totals.total.toFixed(2)}</Typography>
                </Box>
            </Paper>

            <Dialog fullWidth maxWidth="lg" open={openPreview} onClose={() => setOpenPreview(false)}>
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {up(reportName)}
                    <IconButton size="small" onClick={() => setOpenPreview(false)}><CloseIcon /></IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <style>{`
            @media print {
              body * { visibility: hidden !important; }
              .print-area, .print-area * { visibility: visible !important; }
              .print-area { position: absolute; left: 0; top: 0; width: 100%; text-transform: uppercase; }
            }
          `}</style>

                    <Box className="print-area">
                        <Paper sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2">{up(`Desde: ${from} — Hasta: ${to}`)}</Typography>
                            <Typography variant="subtitle2">{up(`Nombre caja: ${fCaja || "TODOS"}`)}</Typography>
                        </Paper>

                        <Paper sx={{ p: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{up("No. Ingreso Caja")}</TableCell>
                                        <TableCell>{up("Fecha")}</TableCell>
                                        <TableCell>{up("Cédula")}</TableCell>
                                        <TableCell>{up("Nombre paciente")}</TableCell>
                                        <TableCell>{up("Cajero")}</TableCell>
                                        <TableCell align="right">{up("Total")}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows.map((r, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{r.ingresoCaja}</TableCell>
                                            <TableCell>{r.fecha}</TableCell>
                                            <TableCell>{r.cedula}</TableCell>
                                            <TableCell>{up(r.paciente)}</TableCell>
                                            <TableCell>{up(r.cajero)}</TableCell>
                                            <TableCell align="right">{r.total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}

                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>{up("Totales")}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => setOpenPreview(false)}>{up("Cerrar")}</Button>
                    <Button variant="contained" onClick={doPrint} sx={{ background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}>{up("Imprimir")}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}