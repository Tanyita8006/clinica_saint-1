import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  MenuItem,
} from "@mui/material";

const FIELD_SX = { width: { xs: "100%", sm: 320 }, minWidth: 240 };
const SMALL_SX = { width: { xs: "100%", sm: 180 }, minWidth: 140 };

function calcAgeParts(dob?: string) {
  if (!dob) return { years: "", months: "", days: "", hours: "" };
  const now = new Date();
  const b = new Date(dob);
  let years = now.getFullYear() - b.getFullYear();
  let months = now.getMonth() - b.getMonth();
  let days = now.getDate() - b.getDate();
  let hours = now.getHours() - b.getHours();
  if (hours < 0) { hours += 24; days -= 1; }
  if (days < 0) {
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
    months -= 1;
  }
  if (months < 0) { months += 12; years -= 1; }
  return { years: String(years), months: String(months), days: String(days), hours: String(hours) };
}

const up = (s?: string) => (s ?? "").toUpperCase();

export default function CertificadoMedico() {
  // paciente (datos precargados de ejemplo)
  const [nombre, setNombre] = useState("EILEEN ROXANA CHIRIBOGA VILLAMAR");
  const [cedula, setCedula] = useState("0952289395");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("1998-04-15");
  const [edadManual, setEdadManual] = useState<string>(""); // será actualizado y deshabilitado
  const [fechaIngreso, setFechaIngreso] = useState<string>("2025-04-22");
  const [historiaClinica, setHistoriaClinica] = useState("10017");

  // laborales (precargado ejemplo)
  const [empresa, setEmpresa] = useState("IMPROMAF C.A.");
  const [direccionTrabajo, setDireccionTrabajo] = useState("VIA A DAULE KM 19");
  const [actividadLaboral, setActividadLaboral] = useState("ENFERMERA");
  const [tipoContingencia, setTipoContingencia] = useState("MATERNIDAD");
  const [domicilio, setDomicilio] = useState("VILLACLUB ETAPA ESTELAR MZ 11");
  const [telefono, setTelefono] = useState("0981644113");

  // reposo (editable)
  const [reposoInicio, setReposoInicio] = useState<string>("2025-04-22");
  const [reposoFin, setReposoFin] = useState<string>("2025-07-15");
  const [diasReposo, setDiasReposo] = useState<string>("84");
  const [diagnostico, setDiagnostico] = useState("PARTO ÚNICO POR CESÁREA / ATENCIÓN MATERNA POR POSICIÓN FETAL OBLÍCUA");
  const [especialidad, setEspecialidad] = useState("GINECOLOGIA");
  const [medico, setMedico] = useState("DRA. ROSA SUCRE MARTÍNEZ");

  const ageParts = useMemo(() => calcAgeParts(fechaNacimiento), [fechaNacimiento]);

  // mantener edad "quemada" sincronizada con fechaNacimiento
  useEffect(() => {
    setEdadManual(ageParts.years);
  }, [ageParts.years]);

  return (
    <Box sx={{ p: 3, textTransform: "uppercase" }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#1A3C6D", fontWeight: 700 }}>
        {up("certificado médico")}
      </Typography>

      {/* Aplico pequeño espacio entre TextField con mr + mb en cada Paper */}
      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>{up("Datos del paciente")}</Typography>

        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label={up("Nombre completo")}
              size="small"
              value={nombre}
              onChange={e => setNombre(e.target.value.toUpperCase())}
              sx={{ flex: 1 }}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />

            <TextField
              label={up("Cédula de identidad")}
              size="small"
              value={cedula}
              onChange={e => setCedula(e.target.value.toUpperCase())}
              sx={FIELD_SX}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label={up("Fecha de nacimiento")}
              type="date"
              size="small"
              value={fechaNacimiento}
              onChange={e => setFechaNacimiento(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={SMALL_SX}
              disabled
            />

            <TextField
              label={up("Edad")}
              type="text"
              size="small"
              value={edadManual}
              sx={{ width: 120 }}
              disabled
            />

            <Box>
              <Typography variant="caption" display="block">{up("Condición de la edad")}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <TextField label={up("Horas")} size="small" value={ageParts.hours} disabled sx={{ width: 90 }} />
                <TextField label={up("Días")} size="small" value={ageParts.days} disabled sx={{ width: 90 }} />
                <TextField label={up("Meses")} size="small" value={ageParts.months} disabled sx={{ width: 90 }} />
                <TextField label={up("Años")} size="small" value={ageParts.years} disabled sx={{ width: 90 }} />
              </Stack>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label={up("Fecha de ingreso")}
              type="date"
              size="small"
              value={fechaIngreso}
              onChange={e => setFechaIngreso(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={FIELD_SX}
              disabled
            />

            <TextField
              label={up("Número de historia clínica")}
              size="small"
              value={historiaClinica}
              onChange={e => setHistoriaClinica(e.target.value.toUpperCase())}
              sx={FIELD_SX}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>{up("Datos laborales")}</Typography>

        <Stack spacing={1}>
          <TextField
            label={up("Empresa")}
            size="small"
            value={empresa}
            onChange={e => setEmpresa(e.target.value.toUpperCase())}
            sx={{ width: "100%" }}
            disabled
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <TextField
            label={up("Dirección trabajo")}
            size="small"
            value={direccionTrabajo}
            onChange={e => setDireccionTrabajo(e.target.value.toUpperCase())}
            sx={{ width: "100%" }}
            disabled
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label={up("Actividad laboral")}
              size="small"
              value={actividadLaboral}
              onChange={e => setActividadLaboral(e.target.value.toUpperCase())}
              sx={FIELD_SX}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            <TextField
              label={up("Tipo de contingencia")}
              size="small"
              value={tipoContingencia}
              onChange={e => setTipoContingencia(e.target.value.toUpperCase())}
              sx={FIELD_SX}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label={up("Domicilio")}
              size="small"
              value={domicilio}
              onChange={e => setDomicilio(e.target.value.toUpperCase())}
              sx={{ flex: 1 }}
              disabled
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
            <TextField
              label={up("Teléfono")}
              size="small"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              sx={SMALL_SX}
              disabled
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>{up("Datos de reposo")}</Typography>

        <Stack spacing={1}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label={up("Fecha de inicio")}
              type="date"
              size="small"
              value={reposoInicio}
              onChange={e => setReposoInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={SMALL_SX}
            />
            <TextField
              label={up("Fecha inicio (letras)")}
              size="small"
              value={reposoInicio ? new Date(reposoInicio).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase() : ""}
              disabled
              sx={{ flex: 1 }}
            />

            <TextField
              label={up("Fecha final")}
              type="date"
              size="small"
              value={reposoFin}
              onChange={e => setReposoFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={SMALL_SX}
            />
            <TextField
              label={up("Fecha final (letras)")}
              size="small"
              value={reposoFin ? new Date(reposoFin).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase() : ""}
              disabled
              sx={{ flex: 1 }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label={up("Días de reposo")}
              type="number"
              size="small"
              value={diasReposo}
              onChange={e => setDiasReposo(e.target.value)}
              sx={{ width: 160 }}
            />
            <TextField
              label={up("Diagnóstico")}
              size="small"
              value={diagnostico}
              onChange={e => setDiagnostico(e.target.value.toUpperCase())}
              sx={{ flex: 1 }}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label={up("Especialidad médica")}
              size="small"
              value={especialidad}
              onChange={e => setEspecialidad(e.target.value.toUpperCase())}
              select
              sx={{ width: 260 }}
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="GINECOLOGIA">GINECOLOGÍA</MenuItem>
              <MenuItem value="MEDICINA_GENERAL">MEDICINA GENERAL</MenuItem>
              <MenuItem value="TRAUMATOLOGIA">TRAUMATOLOGÍA</MenuItem>
            </TextField>

            <TextField
              label={up("Médico tratante")}
              size="small"
              value={medico}
              onChange={e => setMedico(e.target.value.toUpperCase())}
              sx={{ flex: 1 }}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />

            <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Sello / Firma (solicitar)")}</Button>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Registrar")}</Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Editar")}</Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Guardar")}</Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Imprimir")}</Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>{up("Exportar a PDF")}</Button>
      </Stack>
    </Box>
  );
}
