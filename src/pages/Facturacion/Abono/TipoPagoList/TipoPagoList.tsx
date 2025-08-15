import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";

interface RetencionRow {
  id: number;
  nroRet: string;
  valor: string;
  porcentaje: string;
  fecha: string;
  autorizacion: string;
  retIva: string;
}

interface PendienteRow {
  id: number;
  comprobante: string;
  checked: boolean;
  parcial: number; // valor parcial editable
  concepto: string;
  fecha: string;
  cargo: string;
  originalSaldo: number; // saldo original a cubrir
  observacion: string;
}

interface PagoItem {
  id: number;
  tipo: string;
  valor: number;
  detalle?: string;
}

export default function TipoPagoList() {
  const tiposPago = [
    "EFECTIVO",
    "CHEQUE",
    "TARJETA",
    "TRANSFERENCIA",
    "CRUCE CUENTAS",
    "RETENCIÓN",
    "DEVOLUCIÓN",
    "DESCUENTO ROL",
    "CUENTA INCOBRABLE",
  ];

  const bancos = [
    "BANCO PICHINCHA",
    "BANCO GUAYAQUIL",
    "BANCO PACIFICO",
    "BANCO PRODUBANCO",
    "BANCO INTERNACIONAL",
  ];

  const [tipoPago, setTipoPago] = useState<string>("");
  const [bancoSeleccionado, setBancoSeleccionado] = useState<string>("");

  // Cheque
  const [cheque, setCheque] = useState({
    banco: "",
    noCuenta: "",
    nombreCuenta: "",
    noCheque: "",
  });

  // Tarjeta
  const [tarjeta, setTarjeta] = useState({
    banco: "",
    emisor: "",
    noTarjeta: "",
    noAprobacion: "",
    tipo: "CORRIENTE",
    plazo: "",
    lote: "",
    referencia: "",
  });

  // Retenciones
  const [retenciones, setRetenciones] = useState<RetencionRow[]>([]);
  const [nuevaRetencion, setNuevaRetencion] = useState<Partial<RetencionRow>>({
    nroRet: "",
    valor: "",
    porcentaje: "",
    fecha: "",
    autorizacion: "",
    retIva: "",
  });

  // Observación
  const [observacion, setObservacion] = useState<string>("");

  // Pendientes PRE-CARGADOS (cliente)
  const [pendientes, setPendientes] = useState<PendienteRow[]>(
    () => [
      { id: 1, comprobante: "1-2-6844", checked: false, parcial: 0.0, concepto: "H.C.U.:3525 MARRETT", fecha: "06/02/2025", cargo: "ENFERMERIA", originalSaldo: 227.75, observacion: "" },
      { id: 2, comprobante: "1-2-7343", checked: false, parcial: 0.0, concepto: "H.C.U.:9247 ZUÑIGA", fecha: "17/02/2025", cargo: "ENFERMERIA", originalSaldo: 741.37, observacion: "" },
      { id: 3, comprobante: "1-2-7885", checked: false, parcial: 0.0, concepto: "H.C.U.:9381 MANZABA", fecha: "26/02/2025", cargo: "ENFERMERIA", originalSaldo: 476.40, observacion: "" },
      { id: 4, comprobante: "1-2-7887", checked: false, parcial: 0.0, concepto: "H.C.U.:9429 QUIMI", fecha: "28/02/2025", cargo: "ENFERMERIA", originalSaldo: 235.46, observacion: "" },
      { id: 5, comprobante: "1-2-8159", checked: false, parcial: 0.0, concepto: "H.C.U.:9439 YUQUILEMA", fecha: "28/02/2025", cargo: "ENFERMERIA", originalSaldo: 46.00, observacion: "" },
      // puedes añadir más aquí...
    ]
  );

  // pagos por pendiente: mapping pendiente.id -> array de pagos
  const [pagosPorPendiente, setPagosPorPendiente] = useState<Record<number, PagoItem[]>>({});

  // UI: selected pendiente id
  const [selectedPendienteId, setSelectedPendienteId] = useState<number | null>(pendientes.length ? pendientes[0].id : null);

  // Form para agregar pago (se asigna al pendiente seleccionado)
  const [nuevoPagoTipo, setNuevoPagoTipo] = useState<string>("");
  const [nuevoPagoValor, setNuevoPagoValor] = useState<string>("");
  const [nuevoPagoDetalle, setNuevoPagoDetalle] = useState<string>("");

  // Detalles específicos por tipo (cheque / tarjeta / retencion)
  const [nuevoChequePago, setNuevoChequePago] = useState({
    banco: "",
    noCuenta: "",
    nombreCuenta: "",
    noCheque: ""
  });

  const [nuevoTarjetaPago, setNuevoTarjetaPago] = useState({
    banco: "",
    emisor: "",
    noTarjeta: "",
    noAprobacion: "",
    tipo: "CORRIENTE",
    plazo: "",
    lote: "",
    referencia: ""
  });

  // retenciones para el pago (varias líneas)
  const [nuevoPagoRetenciones, setNuevoPagoRetenciones] = useState<RetencionRow[]>([]);
  const [nuevaRetLine, setNuevaRetLine] = useState<Partial<RetencionRow>>({
    nroRet: "",
    valor: "",
    porcentaje: "",
    fecha: "",
    autorizacion: "",
    retIva: ""
  });

  const retencionesSum = (rows: RetencionRow[]) =>
    rows.reduce((s, r) => s + (parseFloat(String(r.valor)) || 0), 0);

  const agregarLineaRet = () => {
    if (!nuevaRetLine.nroRet || !nuevaRetLine.valor) return;
    setNuevoPagoRetenciones(prev => [
      ...prev,
      {
        id: Date.now(),
        nroRet: nuevaRetLine.nroRet || "",
        valor: nuevaRetLine.valor || "0",
        porcentaje: nuevaRetLine.porcentaje || "",
        fecha: nuevaRetLine.fecha || "",
        autorizacion: nuevaRetLine.autorizacion || "",
        retIva: nuevaRetLine.retIva || ""
      }
    ]);
    setNuevaRetLine({ nroRet: "", valor: "", porcentaje: "", fecha: "", autorizacion: "", retIva: "" });
  };

  const eliminarLineaRet = (id: number) => {
    setNuevoPagoRetenciones(prev => prev.filter(r => r.id !== id));
  };

  // util: suma de pagos para una pendiente
  const sumaPagos = (pendienteId: number) => {
    const lista = pagosPorPendiente[pendienteId] || [];
    return lista.reduce((s, p) => s + p.valor, 0);
  };

  const pendienteSeleccionada = useMemo(() => pendientes.find(p => p.id === selectedPendienteId) || null, [pendientes, selectedPendienteId]);

  const handleSelectPendiente = (id: number) => {
    setSelectedPendienteId(id);
  };

  const handleAgregarPago = () => {
    if (!selectedPendienteId) return;
    const pendiente = pendientes.find(p => p.id === selectedPendienteId);
    if (!pendiente) return;

    // Valor final depende del tipo (RETENCIÓN puede sumar sus líneas)
    let valor = parseFloat(nuevoPagoValor || "0");

    // Validaciones y construcción de detalle por tipo
    let detalleResumen = nuevoPagoDetalle || "";
    if (nuevoPagoTipo === "CHEQUE") {
      if (!nuevoChequePago.banco || !nuevoChequePago.noCuenta || !nuevoChequePago.noCheque) return;
      detalleResumen = `CHEQUE - ${nuevoChequePago.banco} Cta:${nuevoChequePago.noCuenta} Nº:${nuevoChequePago.noCheque}`;
      valor = parseFloat(nuevoPagoValor || "0");
    } else if (nuevoPagoTipo === "TARJETA") {
      if (!nuevoTarjetaPago.banco || !nuevoTarjetaPago.noTarjeta || !nuevoTarjetaPago.noAprobacion) return;
      detalleResumen = `TARJETA - ${nuevoTarjetaPago.banco} ${nuevoTarjetaPago.emisor} Nº:${nuevoTarjetaPago.noTarjeta} Aprob:${nuevoTarjetaPago.noAprobacion}`;
      valor = parseFloat(nuevoPagoValor || "0");
    } else if (nuevoPagoTipo === "RETENCIÓN") {
      const suma = retencionesSum(nuevoPagoRetenciones as RetencionRow[]);
      if (suma <= 0) return;
      valor = suma;
      detalleResumen = `RETENCIONES (${nuevoPagoRetenciones.length})`;
    } else {
      // otros tipos usan valor y detalle libres
      if (isNaN(valor) || valor <= 0) return;
    }

    const actualSuma = sumaPagos(selectedPendienteId);
    if (actualSuma + valor > pendiente.originalSaldo + 0.0001) return; // evitar sobrepago

    const nuevoPago: PagoItem = {
      id: Date.now(),
      tipo: nuevoPagoTipo,
      valor,
      detalle: detalleResumen
    };

    setPagosPorPendiente(prev => {
      const next = { ...prev };
      next[selectedPendienteId] = [...(next[selectedPendienteId] || []), nuevoPago];
      return next;
    });

    // reset form and specific detail states
    setNuevoPagoTipo("");
    setNuevoPagoValor("");
    setNuevoPagoDetalle("");
    setNuevoChequePago({ banco: "", noCuenta: "", nombreCuenta: "", noCheque: "" });
    setNuevoTarjetaPago({ banco: "", emisor: "", noTarjeta: "", noAprobacion: "", tipo: "CORRIENTE", plazo: "", lote: "", referencia: "" });
    setNuevoPagoRetenciones([]);
  };

  const handleEliminarPago = (pendienteId: number, pagoId: number) => {
    setPagosPorPendiente(prev => {
      const next = { ...prev };
      next[pendienteId] = (next[pendienteId] || []).filter(p => p.id !== pagoId);
      return next;
    });
  };

  // actualizar parcial/abono manual (si se quiere vincular)
  const actualizarPendienteField = (idx: number, field: keyof PendienteRow, value: any) => {
    setPendientes(prev => prev.map((p, i) => i === idx ? ({ ...p, [field]: value }) : p));
  };

  function agregarRetencion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    // Validar campos requeridos
    if (
      !nuevaRetencion.nroRet ||
      !nuevaRetencion.valor ||
      !nuevaRetencion.porcentaje ||
      !nuevaRetencion.fecha ||
      !nuevaRetencion.autorizacion ||
      !nuevaRetencion.retIva
    ) {
      return;
    }
    setRetenciones(prev => [
      ...prev,
      {
        id: Date.now(),
        nroRet: nuevaRetencion.nroRet,
        valor: nuevaRetencion.valor,
        porcentaje: nuevaRetencion.porcentaje,
        fecha: nuevaRetencion.fecha,
        autorizacion: nuevaRetencion.autorizacion,
        retIva: nuevaRetencion.retIva,
      } as RetencionRow,
    ]);
    setNuevaRetencion({
      nroRet: "",
      valor: "",
      porcentaje: "",
      fecha: "",
      autorizacion: "",
      retIva: "",
    });
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* PENDIENTES - pre-cargados / seleccionar uno */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}>
          PENDIENTES
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "#e3f2fd" }}>
              <TableCell>Sel</TableCell>
              <TableCell>Comprobante</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Observación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendientes.map((p) => {
              const pagos = pagosPorPendiente[p.id] || [];
              const suma = pagos.reduce((s, it) => s + it.valor, 0);
              const restante = Math.max(0, p.originalSaldo - suma);
              return (
                <TableRow
                  key={p.id}
                  hover
                  onClick={() => handleSelectPendiente(p.id)}
                  sx={{
                    backgroundColor: p.id === selectedPendienteId ? "#E3F2FD" : undefined,
                    cursor: "pointer"
                  }}
                >
                  <TableCell>
                    <Checkbox checked={p.id === selectedPendienteId} onChange={() => handleSelectPendiente(p.id)} />
                  </TableCell>
                  <TableCell>{p.comprobante}</TableCell>
                  <TableCell>{p.concepto}</TableCell>
                  <TableCell>{p.fecha}</TableCell>
                  <TableCell>{p.cargo}</TableCell>
                  <TableCell>
                    <div><b>{p.originalSaldo.toFixed(2)}</b></div>
                    <div style={{ fontSize: 12, color: suma > 0 ? "#1B5E20" : "#666" }}>
                      Abonado: {suma.toFixed(2)} — Rest: {restante.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>{p.observacion}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* area para agregar pagos al pendiente seleccionado */}
        {selectedPendienteId && pendienteSeleccionada && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: "#1A3C6D", fontWeight: "bold", mb: 2 }}>
              <PaymentIcon sx={{ mr: 1, verticalAlign: "middle" }} /> TIPO DE PAGO
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Agregar pagos para: <b>{pendienteSeleccionada.comprobante} — {pendienteSeleccionada.concepto}</b></Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Tipo de Pago</InputLabel>
                <Select value={nuevoPagoTipo} label="Tipo de Pago" onChange={e => setNuevoPagoTipo(e.target.value)}>
                  {tiposPago.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Valor" size="small" type="number" value={nuevoPagoValor} onChange={e => setNuevoPagoValor(e.target.value)} sx={{ minWidth: 120 }} inputProps={{ min: 0 }} />
              <TextField label="Detalle" size="small" value={nuevoPagoDetalle} onChange={e => setNuevoPagoDetalle(e.target.value)} sx={{ minWidth: 220 }} />

              {/* Campos específicos según tipo seleccionado */}
              {nuevoPagoTipo === "CHEQUE" && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Banco</InputLabel>
                    <Select value={nuevoChequePago.banco} label="Banco" onChange={e => setNuevoChequePago(prev => ({ ...prev, banco: e.target.value }))}>
                      <MenuItem value="">--Seleccione banco--</MenuItem>
                      {bancos.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField label="N° Cuenta" size="small" type="number" value={nuevoChequePago.noCuenta} onChange={e => setNuevoChequePago(prev => ({ ...prev, noCuenta: e.target.value }))} />
                  <TextField label="N° Cheque" size="small" type="number" value={nuevoChequePago.noCheque} onChange={e => setNuevoChequePago(prev => ({ ...prev, noCheque: e.target.value }))} />
                </Box>
              )}

              {nuevoPagoTipo === "TARJETA" && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Banco</InputLabel>
                    <Select value={nuevoTarjetaPago.banco} label="Banco" onChange={e => setNuevoTarjetaPago(prev => ({ ...prev, banco: e.target.value }))}>
                      <MenuItem value="">--Seleccione banco--</MenuItem>
                      {bancos.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <TextField label="Emisor" size="small" value={nuevoTarjetaPago.emisor} onChange={e => setNuevoTarjetaPago(prev => ({ ...prev, emisor: e.target.value }))} />
                  <TextField label="N° Tarjeta" size="small" type="number" value={nuevoTarjetaPago.noTarjeta} onChange={e => setNuevoTarjetaPago(prev => ({ ...prev, noTarjeta: e.target.value }))} />
                  <TextField label="N° Aprobación" size="small" type="number" value={nuevoTarjetaPago.noAprobacion} onChange={e => setNuevoTarjetaPago(prev => ({ ...prev, noAprobacion: e.target.value }))} />
                </Box>
              )}

              {nuevoPagoTipo === "RETENCIÓN" && (
                <Paper sx={{ p: 1, width: "100%", mt: 1 }}>
                  <Typography variant="caption">Retenciones (agrega 1 o más líneas; el valor del pago será la suma)</Typography>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
                    <TextField placeholder="N°RET" size="small" value={nuevaRetLine.nroRet || ""} onChange={e => setNuevaRetLine(prev => ({ ...prev, nroRet: e.target.value }))} />
                    <TextField placeholder="$RET" size="small" value={nuevaRetLine.valor || ""} onChange={e => setNuevaRetLine(prev => ({ ...prev, valor: e.target.value }))} type="number" />
                    <TextField placeholder="%RET" size="small" value={nuevaRetLine.porcentaje || ""} onChange={e => setNuevaRetLine(prev => ({ ...prev, porcentaje: e.target.value }))} />
                    <Button size="small" variant="contained" onClick={agregarLineaRet}><AddIcon /></Button>
                  </Box>
                  <Table size="small" sx={{ mt: 1 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>N°RET</TableCell>
                        <TableCell>$RET</TableCell>
                        <TableCell>%RET</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {nuevoPagoRetenciones.map(r => (
                        <TableRow key={r.id}>
                          <TableCell>{r.nroRet}</TableCell>
                          <TableCell>{r.valor}</TableCell>
                          <TableCell>{r.porcentaje}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="error" onClick={() => eliminarLineaRet(r.id)}><DeleteIcon fontSize="small" /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ textAlign: "right", fontWeight: "bold" }}>Total retenciones:</TableCell>
                        <TableCell>{retencionesSum(nuevoPagoRetenciones).toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              )}

              <Button variant="contained" sx={{
                background: "#1A3C6D",
                "&:hover": { background: "#274472" },
                fontSize: "0.8rem"
              }} startIcon={<AddIcon />} onClick={handleAgregarPago} disabled={!nuevoPagoTipo || Number(nuevoPagoValor) <= 0 && nuevoPagoTipo !== "RETENCIÓN"}>
                Agregar pago
              </Button>
            </Box>

            {/* mostrar tabla de pagos asociados al pendiente seleccionado */}
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Pagos asociados</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Detalle</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(pagosPorPendiente[selectedPendienteId] || []).map(pay => (
                    <TableRow key={pay.id}>
                      <TableCell>{pay.tipo}</TableCell>
                      <TableCell>{pay.valor.toFixed(2)}</TableCell>
                      <TableCell>{pay.detalle}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={() => handleEliminarPago(selectedPendienteId, pay.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {((pagosPorPendiente[selectedPendienteId] || []).length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: "center", py: 2 }}>No hay pagos agregados</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
