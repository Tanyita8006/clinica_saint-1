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
  Divider,
} from "@mui/material";

const BILL_DENOMS = [100.0, 50.0, 20.0, 10.0, 5.0, 1.0];
const COIN_DENOMS = [1.0, 0.5, 0.25, 0.1, 0.05, 0.01];

export default function CierreCaja() {
  const todayIso = new Date().toISOString().slice(0, 10);

  // Periodo / horas
  const [fromDate, setFromDate] = useState<string>(todayIso);
  const [toDate, setToDate] = useState<string>(todayIso);
  const [startTime, setStartTime] = useState<string>(""); // HH:MM
  const [endTime, setEndTime] = useState<string>(""); // HH:MM
  const [hoursError, setHoursError] = useState<string | null>(null);

  // Counts for bills and coins
  const [billCounts, setBillCounts] = useState<Record<number, number>>(
    Object.fromEntries(BILL_DENOMS.map(d => [d, 0]))
  );
  const [coinCounts, setCoinCounts] = useState<Record<number, number>>(
    Object.fromEntries(COIN_DENOMS.map(d => [d, 0]))
  );

  // Concept numeric inputs (mocked / manual)
  const [concepts, setConcepts] = useState({
    facturado: 0,
    credito: 0,
    tarjeta: 0,
    cheque: 0,
    efectivo: 0,
    transferencia: 0,
    abonoEfectivo: 0,
    abonoOtros: 0,
    anticipoEfectivo: 0,
    anticipoOtros: 0,
    facturasProveedores: 0,
    devoluciones: 0,
    valeCaja: 0,
    depositos: 0,
  });

  const [observacion, setObservacion] = useState<string>("");

  // Derived sums
  const billsTotal = useMemo(
    () =>
      BILL_DENOMS.reduce((acc, d) => acc + (billCounts[d] ?? 0) * d, 0),
    [billCounts]
  );
  const coinsTotal = useMemo(
    () =>
      COIN_DENOMS.reduce((acc, d) => acc + (coinCounts[d] ?? 0) * d, 0),
    [coinCounts]
  );
  const efectivoReal = useMemo(() => billsTotal + coinsTotal, [billsTotal, coinsTotal]);

  const efectivoNeto = useMemo(() => {
    const ingresoEfectivo =
      Number(concepts.efectivo) +
      Number(concepts.abonoEfectivo) +
      Number(concepts.anticipoEfectivo);
    const egresos =
      Number(concepts.facturasProveedores) +
      Number(concepts.devoluciones) +
      Number(concepts.valeCaja) +
      Number(concepts.depositos);
    return ingresoEfectivo - egresos;
  }, [concepts]);

  const totalFacturado = useMemo(() => Number(concepts.facturado) + Number(concepts.credito), [concepts]);

  const diferencia = useMemo(() => efectivoNeto - efectivoReal, [efectivoNeto, efectivoReal]);

  // Handlers
  const setBillCount = (denom: number, value: string) => {
    const n = Math.max(0, Math.floor(Number(value) || 0));
    setBillCounts(prev => ({ ...prev, [denom]: n }));
  };

  const setCoinCount = (denom: number, value: string) => {
    const n = Math.max(0, Math.floor(Number(value) || 0));
    setCoinCounts(prev => ({ ...prev, [denom]: n }));
  };

  const setConceptValue = (key: keyof typeof concepts, value: string) => {
    const num = Number(value || 0);
    setConcepts(prev => ({ ...prev, [key]: num }));
  };

  const handleGenerar = () => {
    if (!startTime || !endTime) {
      setHoursError("Es obligatorio indicar hora inicio y hora cierre.");
      return;
    }
    setHoursError(null);
    alert("Cierre generado correctamente (simulado). Reimprimir para ver formato.");
  };

  const handleReimprimir = () => {
    window.print();
  };

  const handleCerrar = () => {
    window.history.back();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        CIERRE DE CAJA
      </Typography>

      {/* Periodo */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            label="Fecha inicio"
            type="date"
            size="small"
            sx={{ minWidth: 180 }}
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Fecha final"
            type="date"
            size="small"
            sx={{ minWidth: 180 }}
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Hora inicio (HH:MM)"
            placeholder="09:00"
            size="small"
            sx={{ minWidth: 140 }}
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          />

          <TextField
            label="Hora cierre (HH:MM)"
            placeholder="17:00"
            size="small"
            sx={{ minWidth: 140 }}
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          />

          <Box sx={{ flex: 1 }} />

          <Box>
            <Button variant="outlined" onClick={() => { /* consultar lógica si aplica */ }} sx={{ mr: 1 }}>
              Consultar
            </Button>
            {hoursError && (
              <Typography color="error" variant="body2" component="span" sx={{ ml: 2 }}>
                {hoursError}
              </Typography>
            )}
          </Box>
        </Stack>
      </Paper>

      {/* Main area: bills/coins (left) and conceptos (right) using Box layout like ReporteriaFacturacion */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: 320 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              CONTROL DE BILLETES Y MONEDAS
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="subtitle2">BILLETES</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>DENOMINACIÓN</TableCell>
                      <TableCell>CANT</TableCell>
                      <TableCell>VALOR</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {BILL_DENOMS.map(d => (
                      <TableRow key={d}>
                        <TableCell>{d.toFixed(2)}</TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            inputProps={{ min: 0 }}
                            value={billCounts[d]}
                            onChange={e => setBillCount(d, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>{((billCounts[d] ?? 0) * d).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                        SUBTOTAL BILLETES
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{billsTotal.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography variant="subtitle2">MONEDAS</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>DENOMINACIÓN</TableCell>
                      <TableCell>CANT</TableCell>
                      <TableCell>VALOR</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {COIN_DENOMS.map(d => (
                      <TableRow key={d}>
                        <TableCell>{d.toFixed(2)}</TableCell>
                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            inputProps={{ min: 0 }}
                            value={coinCounts[d]}
                            onChange={e => setCoinCount(d, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>{((coinCounts[d] ?? 0) * d).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                        SUBTOTAL MONEDAS
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{coinsTotal.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">EFECTIVO REAL</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {efectivoReal.toFixed(2)}
              </Typography>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: 320 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              SUMA DE VALORES / CONCEPTOS
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                { key: "facturado", label: "Total Facturado" },
                { key: "credito", label: "Crédito +" },
                { key: "tarjeta", label: "Tarjeta +" },
                { key: "cheque", label: "Cheque +" },
                { key: "efectivo", label: "Efectivo +" },
                { key: "transferencia", label: "Transferencia +" },
                { key: "abonoEfectivo", label: "Abonos Efectivo +" },
                { key: "abonoOtros", label: "Abonos Otros +" },
                { key: "anticipoEfectivo", label: "Anticipo Efectivo +" },
                { key: "anticipoOtros", label: "Anticipo Otros +" },
                { key: "facturasProveedores", label: "Facturas Proveedores -" },
                { key: "devoluciones", label: "Devoluciones -" },
                { key: "valeCaja", label: "Vale Caja -" },
                { key: "depositos", label: "Depósitos -" },
              ].map(item => (
                <Box key={item.key} sx={{ width: { xs: "100%", sm: "48%" } }}>
                  <TextField
                    label={item.label}
                    size="small"
                    type="number"
                    fullWidth
                    value={(concepts as any)[item.key]}
                    onChange={e => setConceptValue(item.key as any, e.target.value)}
                  />
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">EFECTIVO NETO</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {efectivoNeto.toFixed(2)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
              <Typography variant="subtitle2">DIFERENCIA (NETO - REAL)</Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: Math.abs(diferencia) > 0.009 ? "error.main" : "text.primary" }}
              >
                {diferencia.toFixed(2)}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Box>

      {/* Observacion and buttons */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <TextField
          label="Observación"
          fullWidth
          multiline
          rows={3}
          value={observacion}
          onChange={e => setObservacion(e.target.value)}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGenerar} sx={{ background: "#1A3C6D" }}>
            Generar
          </Button>

          <Button variant="outlined" onClick={handleReimprimir}>
            Reimprimir
          </Button>

          <Button variant="text" onClick={handleCerrar}>
            Cerrar
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
