import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import SummarizeIcon from '@mui/icons-material/Summarize';
import CloseIcon from "@mui/icons-material/Close";

const OPTIONS = [
  "FORMA DE PAGO",
  "ABONOS",
  "TARJETAS",
  "ANULADAS",
  "NOTAS DE CRÉDITO",
];

type GenericRow = {
  id: number;
  fecha: string; // yyyy-mm-dd
  descripcion?: string;
  cedula?: string;
  nombre?: string;
  cajero?: string;
  total?: number;
  formaPago?: string;
  estado?: string;
};

const SAMPLE: Record<string, GenericRow[]> = {
  "FORMA DE PAGO": [
    { id: 1, fecha: "2025-08-01", formaPago: "EFECTIVO", total: 150.0, descripcion: "Pago servicio" },
    { id: 2, fecha: "2025-08-01", formaPago: "TARJETA", total: 220.5, descripcion: "Pago laboratorio" },
    { id: 3, fecha: "2025-08-02", formaPago: "TRANSFERENCIA", total: 500.0, descripcion: "Pago hospitalización" },
  ],
  ABONOS: [
    { id: 11, fecha: "2025-08-01", cedula: "0912345678", nombre: "JUAN PEREZ", cajero: "CARLOS", total: 120.0, descripcion: "Abono factura 1001" },
    { id: 12, fecha: "2025-08-02", cedula: "0923456789", nombre: "MARIA LOPEZ", cajero: "ANA", total: 250.5, descripcion: "Abono factura 1002" },
  ],
  TARJETAS: [
    { id: 21, fecha: "2025-08-01", formaPago: "VISA", total: 80.0, descripcion: "Tarjeta - consulta" },
    { id: 22, fecha: "2025-08-02", formaPago: "MASTERCARD", total: 150.0, description: "Tarjeta - examen" } as any,
  ],
  ANULADAS: [
    { id: 31, fecha: "2025-07-30", cedula: "0934567890", nombre: "PEDRO GOMEZ", total: 0, estado: "ANULADA", descripcion: "Factura anulada 2001" },
  ],
  "NOTAS DE CRÉDITO": [
    { id: 41, fecha: "2025-08-03", cedula: "0912345678", nombre: "JUAN PEREZ", total: -50.0, descripcion: "Nota de crédito por descuento" },
  ],
};

export default function ReporteriaFacturacion() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const weekAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [option, setOption] = useState<string>(OPTIONS[0]);
  const [from, setFrom] = useState<string>(weekAgoIso);
  const [to, setTo] = useState<string>(todayIso);
  const [showReport, setShowReport] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [requestFormatsOpen, setRequestFormatsOpen] = useState(false);

  const [rows, setRows] = useState<GenericRow[]>([]);

  const up = (s?: string) => (s ? s.toUpperCase() : "");

  const handleView = () => {
    // cargar datos "quemados" según opción y rango de fechas (simulado)
    const all = SAMPLE[option] ?? [];
    const fDt = new Date(from);
    const tDt = new Date(to);
    const filtered = all.filter(r => {
      const d = new Date(r.fecha);
      return d >= fDt && d <= tDt;
    });
    setRows(filtered);
    setShowReport(true);
  };

  const handleExportPdf = () => {
    // preview para que el usuario imprima a PDF
    setPreviewOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#1A3C6D", fontWeight: "bold" }}>
        <SummarizeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        {up("Reportes de facturación")}
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            select
            label={up("Opciones")}
            value={option}
            size="small"
            onChange={e => setOption(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            {OPTIONS.map(o => (
              <MenuItem key={o} value={o}>
                {up(o)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label={up("Desde")}
            type="date"
            size="small"
            value={from}
            onChange={e => setFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label={up("Hasta")}
            type="date"
            size="small"
            value={to}
            onChange={e => setTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ flex: 1 }} />

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
            onClick={handleExportPdf}
            sx={{ minWidth: 140, height: 36, color: "#1A3C6D", borderColor: "#1A3C6D", "&:hover": { background: "#f5f5f5" } }}
          >
            {up("Exportar (PDF)")}
          </Button>

          
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, minHeight: 260 }}>
        {!showReport ? (
          <Typography variant="body2" color="textSecondary">
            {up("Seleccione opciones y presione VER para mostrar el reporte")}
          </Typography>
        ) : (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {up(`Opción: ${option} | Desde: ${from} — Hasta: ${to}`)}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{up("Fecha")}</TableCell>
                  <TableCell>{up("Descripción")}</TableCell>
                  <TableCell>{up("Cédula")}</TableCell>
                  <TableCell>{up("Nombre")}</TableCell>
                  <TableCell>{up("Cajero")}</TableCell>
                  <TableCell align="right">{up("Total")}</TableCell>
                  <TableCell>{up("Forma/Estado")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ color: "text.secondary" }}>
                      {up("No hay registros en el rango seleccionado")}
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map(r => (
                    <TableRow key={r.id}>
                      <TableCell>{r.fecha}</TableCell>
                      <TableCell>{r.descripcion}</TableCell>
                      <TableCell>{r.cedula || ""}</TableCell>
                      <TableCell>{r.nombre || ""}</TableCell>
                      <TableCell>{r.cajero || ""}</TableCell>
                      <TableCell align="right">{(r.total ?? 0).toFixed(2)}</TableCell>
                      <TableCell>{r.formaPago || r.estado || ""}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </Paper>

      {/* Preview dialog para exportar a PDF (usuario usará imprimir -> guardar como PDF) */}
      <Dialog fullWidth maxWidth="lg" open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {up("Vista previa - exportar a PDF")}
          <IconButton size="small" onClick={() => setPreviewOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <style>{`
            @media print {
              body * { visibility: hidden !important; }
              .print-area, .print-area * { visibility: visible !important; }
              .print-area { position: absolute; left: 0; top: 0; width: 100%; }
            }
          `}</style>

          <Box className="print-area" sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{up("Reporte")}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{up(`Opción: ${option} | Desde: ${from} — Hasta: ${to}`)}</Typography>

            <Paper sx={{ p: 2 }}>
              <Typography variant="body2">{up("Contenido del reporte (ejemplo) — aquí el formato real se renderizaría antes de exportar a PDF.")}</Typography>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={() => setPreviewOpen(false)}>{up("Cerrar")}</Button>
          <Button variant="contained" onClick={handlePrint} sx={{ background: "#1A3C6D", color: "#fff", "&:hover": { background: "#274472" } }}>
            {up("Exportar (PDF)")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para solicitar formatos de reporte */}
   
    </Box>
  );
}