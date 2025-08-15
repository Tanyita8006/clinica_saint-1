// ...existing code...
import React, { useMemo, useState } from "react";
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
import SummarizeIcon from '@mui/icons-material/Summarize';

type Row = {
  caja: string;
  factura: number;
  fecha: string; // yyyy-mm-dd
  cedula: string;
  nombre: string;
  subtotal: number;
  abonos: number;
  descuento: number;
  total: number;
};

const sampleData: Row[] = [
  { caja: "CAJA 1", factura: 1234, fecha: "2025-07-01", cedula: "0912345678", nombre: "JUAN PEREZ", subtotal: 100, abonos: 50, descuento: 10, total: 90 },
  { caja: "CAJA 2", factura: 1235, fecha: "2025-07-02", cedula: "0923456789", nombre: "MARIA LOPEZ", subtotal: 200, abonos: 200, descuento: 0, total: 200 },
  // agrega más filas de ejemplo si hace falta
];

export default function ReporteDescuentoAhorro() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const weekAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [from, setFrom] = useState<string>(weekAgoIso);
  const [to, setTo] = useState<string>(todayIso);
  const [fCaja, setFCaja] = useState<string>("");
  const [filtered, setFiltered] = useState<Row[] | null>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const up = (s?: string) => (s ? s.toUpperCase() : "");

  const handleView = () => {
    const fromDt = new Date(from);
    const toDt = new Date(to);
    const res = sampleData.filter(r => {
      const d = new Date(r.fecha);
      if (d < fromDt || d > toDt) return false;
      if (fCaja && !r.caja.toLowerCase().includes(fCaja.toLowerCase())) return false;
      return true;
    });
    setFiltered(res);
  };

  const rows = filtered ?? sampleData.filter(r => {
    const d = new Date(r.fecha);
    return d >= new Date(from) && d <= new Date(to) && (!fCaja || r.caja.toLowerCase().includes(fCaja.toLowerCase()));
  });

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.subtotal += r.subtotal;
        acc.abonos += r.abonos;
        acc.descuento += r.descuento;
        acc.total += r.total;
        acc.recaudado += r.abonos;
        return acc;
      },
      { subtotal: 0, abonos: 0, descuento: 0, total: 0, recaudado: 0 }
    );
  }, [rows]);

  const exportCsv = () => {
    const headers = ["Nombre caja", "No. Factura", "Fecha", "Cédula", "Nombre", "Subtotal", "Abonos", "Descuento", "Total"];
    const csv = [
      headers.join(","),
      ...rows.map(r =>
        [
          `"${r.caja}"`,
          r.factura,
          r.fecha,
          `"${r.cedula}"`,
          `"${r.nombre}"`,
          r.subtotal.toFixed(2),
          r.abonos.toFixed(2),
          r.descuento.toFixed(2),
          r.total.toFixed(2),
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_descuentos_ahorros_${from}_a_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => setOpenPreview(true);
  const doPrint = () => window.print();
  const handleClose = () => {
    if (openPreview) { setOpenPreview(false); return; }
    window.history.back();
  };

  return (
    <Box sx={{ p: 3, textTransform: "uppercase" }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#1A3C6D", fontWeight: "bold" }}>
        <SummarizeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        {up("Reporte general de descuentos y ahorros")}
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField label={up("Desde")} type="date" size="small" value={from} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField label={up("Hasta")} type="date" size="small" value={to} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} />
          <TextField label={up("Nombre caja")} size="small" value={fCaja} onChange={e => setFCaja(e.target.value)} />

          <Box sx={{ display: "flex", gap: 1, ml: 1, alignItems: "center", flexWrap: "wrap" }}>
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
              onClick={handlePrint}
              sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
            >
              {up("Imprimir")}
            </Button>

            <Button
              size="small"
              variant="text"
              onClick={handleClose}
              sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}
            >
              {up("Cerrar")}
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{up("Nombre caja")}</TableCell>
              <TableCell>{up("No. Factura")}</TableCell>
              <TableCell>{up("Fecha")}</TableCell>
              <TableCell>{up("Cédula")}</TableCell>
              <TableCell>{up("Nombre")}</TableCell>
              <TableCell align="right">{up("Subtotal")}</TableCell>
              <TableCell align="right">{up("Abonos")}</TableCell>
              <TableCell align="right">{up("Descuento")}</TableCell>
              <TableCell align="right">{up("Total")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{up(r.caja)}</TableCell>
                <TableCell>{r.factura}</TableCell>
                <TableCell>{r.fecha}</TableCell>
                <TableCell>{r.cedula}</TableCell>
                <TableCell>{up(r.nombre)}</TableCell>
                <TableCell align="right">{r.subtotal.toFixed(2)}</TableCell>
                <TableCell align="right">{r.abonos.toFixed(2)}</TableCell>
                <TableCell align="right">{r.descuento.toFixed(2)}</TableCell>
                <TableCell align="right">{r.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>{up("Totales")}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.subtotal.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.abonos.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.descuento.toFixed(2)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Typography variant="body2"><b>{up("Total recaudado")}:</b> {totals.recaudado.toFixed(2)}</Typography>
        </Box>
      </Paper>

      <Dialog fullWidth maxWidth="lg" open={openPreview} onClose={() => setOpenPreview(false)}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {up("Reporte general de descuentos y ahorros")}
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
              <Typography variant="subtitle2">{up(`Filtro Caja: ${fCaja || "TODOS"}`)}</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{up("Nombre caja")}</TableCell>
                    <TableCell>{up("No. Factura")}</TableCell>
                    <TableCell>{up("Fecha")}</TableCell>
                    <TableCell>{up("Cédula")}</TableCell>
                    <TableCell>{up("Nombre")}</TableCell>
                    <TableCell align="right">{up("Subtotal")}</TableCell>
                    <TableCell align="right">{up("Abonos")}</TableCell>
                    <TableCell align="right">{up("Descuento")}</TableCell>
                    <TableCell align="right">{up("Total")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{up(r.caja)}</TableCell>
                      <TableCell>{r.factura}</TableCell>
                      <TableCell>{r.fecha}</TableCell>
                      <TableCell>{r.cedula}</TableCell>
                      <TableCell>{up(r.nombre)}</TableCell>
                      <TableCell align="right">{r.subtotal.toFixed(2)}</TableCell>
                      <TableCell align="right">{r.abonos.toFixed(2)}</TableCell>
                      <TableCell align="right">{r.descuento.toFixed(2)}</TableCell>
                      <TableCell align="right">{r.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={5} sx={{ fontWeight: "bold" }}>{up("Totales")}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.subtotal.toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.abonos.toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.descuento.toFixed(2)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Typography variant="body2"><b>{up("Total recaudado")}:</b> {totals.recaudado.toFixed(2)}</Typography>
              </Box>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }} onClick={() => setOpenPreview(false)}>{up("Cerrar")}</Button>
          <Button variant="contained" onClick={doPrint} sx={{ minWidth: 100, height: 36, background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}>{up("Imprimir")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
// ...existing code...