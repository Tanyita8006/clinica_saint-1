import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";

const FIELD_SX = { width: { xs: "100%", sm: 320 }, minWidth: 240 };
const SMALL_SX = { width: { xs: "100%", sm: 180 }, minWidth: 140 };
const up = (s?: string) => (s ?? "").toUpperCase();

export default function ConsultaExterna() {
  // simple state for checklists (maquetado)
  const [motivoPrimera, setMotivoPrimera] = useState(false);
  const [motivoSubsecuente, setMotivoSubsecuente] = useState(false);

  const antecedentesList = [
    "Cardiopatía",
    "Hipertensión",
    "Enf. Vascular",
    "Endócrino Metabólico",
    "Cáncer",
    "Tuberculosis",
    "Enf. Mental",
    "Enf. Infecciosa",
    "Mal Formación",
    "Otro",
  ];

  const revisiones = [
    "Piel - Anexos",
    "Órganos de los sentidos",
    "Respiratorio",
    "Cardio - vascular",
    "Digestivo",
    "Genito-Urinario",
    "Músculo - esquelético",
    "Endocrino",
    "Hemo – Linfático",
    "Nervioso",
  ];

  const regional = [
    "Piel - Faneras / Órganos de los sentidos",
    "Cabeza",
    "Ojos",
    "Oidos",
    "Nariz",
    "Boca",
    "Orofaringe",
    "Cuello",
    "Axilas - Mamas",
    "Tórax",
    "Abdomen",
    "Vertebral",
    "Ingle - Periné",
    "Miembros Superiores",
    "Miembros Inferiores",
  ];

  const sistemico = [
    "Órganos de los sentidos",
    "Respiratorio",
    "Cardio-Vascular",
    "Digestivo",
    "Genital",
    "Urinario",
    "Músculo – esquelético",
    "Endocrino",
    "Hemo – Linfático",
    "Neurológico",
  ];

  return (
    <Box sx={{ p: 3, textTransform: "uppercase" }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#1A3C6D", fontWeight: 700 }}>
        {up("CONSULTAS EXTERNAS GENERAL (FORMULARIO 002 MSP)")}
      </Typography>

      {/* A. Datos del Establecimiento y paciente */}
      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("A. DATOS DEL ESTABLECIMIENTO Y PACIENTE")}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Box sx={{ width: { xs: "100%", sm: "33.3333%" } }}>
            <TextField label={up("Institución")} size="small" value="MSP" disabled fullWidth />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "33.3333%" } }}>
            <TextField label={up("UNICÓDIGO")} size="small" value="64876" disabled fullWidth />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "33.3333%" } }}>
            <TextField label={up("Establecimiento de Salud")} size="small" placeholder="--" disabled fullWidth />
          </Box>

          <Box sx={{ width: { xs: "100%", sm: "33.3333%" } }}>
            <TextField label={up("Número Historia Clínica Única")} size="small" placeholder="--" disabled fullWidth />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "33.3333%" } }}>
            <TextField label={up("Número de Archivo")} size="small" placeholder="--" disabled fullWidth />
          </Box>

          <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
            <TextField label={up("Nombre del paciente")} size="small" placeholder="--" disabled fullWidth />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "25%" } }}>
            <TextField label={up("Cédula")} size="small" placeholder="--" disabled fullWidth />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "25%" } }}>
            <TextField label={up("Edad")} size="small" placeholder="--" disabled fullWidth />
          </Box>
        </Box>
      </Paper>

      {/* B. Motivo de consulta */}
      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("B. MOTIVO DE CONSULTA")}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <FormControlLabel
            control={<Checkbox checked={motivoPrimera} onChange={(e) => setMotivoPrimera(e.target.checked)} />}
            label={up("Primera")}
          />
          <FormControlLabel
            control={<Checkbox checked={motivoSubsecuente} onChange={(e) => setMotivoSubsecuente(e.target.checked)} />}
            label={up("Subsecuente")}
          />
        </Stack>

        <TextField
          label={up("Información adicional")}
          size="small"
          multiline
          rows={3}
          placeholder="Escribir motivo o detalles..."
          fullWidth
        />
      </Paper>

      {/* C / D. Antecedentes personales y familiares */}
      <Paper sx={{ p: 2, mb: 2, "& .MuiTextField-root": { mr: 1, mb: 1 } }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              {up("C. ANTECEDENTES PATOLOGICOS PERSONALES")}
            </Typography>
            <Stack>
              {antecedentesList.map((a) => (
                <FormControlLabel key={a} control={<Checkbox />} label={up(a)} />
              ))}
              <TextField label={up("Aporte adicional (300 caracteres)")} size="small" multiline rows={3} fullWidth />
            </Stack>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              {up("D. ANTECEDENTES PATOLOGICOS FAMILIARES")}
            </Typography>
            <Stack>
              {antecedentesList.map((a) => (
                <FormControlLabel key={a + "-fam"} control={<Checkbox />} label={up(a)} />
              ))}
              <TextField label={up("Aporte adicional")} size="small" multiline rows={3} fullWidth />
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* E. Enfermedad Actual */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("E. ENFERMEDAD O PROBLEMA ACTUAL")}
        </Typography>

        <TextField label={up("Descripción")} size="small" multiline rows={4} fullWidth />
      </Paper>

      {/* F. Constantes Vitales y Antropometría */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("F. CONSTANTES VITALES Y ANTROPOMETRÍA")}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            { label: "Fecha", w: { xs: "50%", sm: "25%" } },
            { label: "Hora", w: { xs: "50%", sm: "25%" } },
            { label: "Temperatura (°C)", w: { xs: "50%", sm: "25%" } },
            { label: "Presión arterial (mmHg)", w: { xs: "50%", sm: "25%" } },
            { label: "Pulso /min", w: { xs: "50%", sm: "25%" } },
            { label: "FR /min", w: { xs: "50%", sm: "25%" } },
            { label: "Peso (kg)", w: { xs: "50%", sm: "25%" } },
            { label: "Talla (cm)", w: { xs: "50%", sm: "25%" } },
            { label: "IMC", w: { xs: "50%", sm: "25%" } },
            { label: "Perímetro abdominal (cm)", w: { xs: "50%", sm: "25%" } },
            { label: "Hemoglobina capilar (g/dl)", w: { xs: "50%", sm: "25%" } },
            { label: "Glucosa capilar (mg/dl)", w: { xs: "50%", sm: "25%" } },
            { label: "Pulsioximetría (%)", w: { xs: "50%", sm: "25%" } },
          ].map((it) => (
            <Box key={it.label} sx={{ width: it.w }}>
              <TextField label={up(it.label)} size="small" disabled fullWidth />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* G. Revisión de órganos y sistemas */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("G. REVISIÓN ACTUAL DE ÓRGANOS Y SISTEMAS")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            {revisiones.map((r) => (
              <FormControlLabel key={r} control={<Checkbox />} label={up(r)} />
            ))}
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <TextField label={up("Descripción (200 caracteres)")} size="small" multiline rows={6} fullWidth />
          </Box>
        </Box>
      </Paper>

      {/* H. Examen Físico */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("H. EXAMEN FÍSICO")}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {up("Regional")}
            </Typography>
            <Stack>
              {regional.map((r) => (
                <FormControlLabel key={r} control={<Checkbox />} label={up(r)} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {up("Sistémico")}
            </Typography>
            <Stack>
              {sistemico.map((s) => (
                <FormControlLabel key={s} control={<Checkbox />} label={up(s)} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField label={up("Descripción examen físico")} size="small" multiline rows={4} fullWidth />
          </Box>
        </Box>
      </Paper>

      {/* I. Diagnóstico */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("I. DIAGNÓSTICO")}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <TextField label={up("Buscar CIE10")} size="small" placeholder="Buscar diagnóstico (CIE10)..." sx={FIELD_SX} />
          <FormControlLabel control={<Checkbox />} label={up("PRE (Presuntivo)")} />
          <FormControlLabel control={<Checkbox />} label={up("DEF (Definitivo)")} />
        </Stack>

        <Divider sx={{ my: 1 }} />
        <TextField label={up("Registros de diagnósticos seleccionados")} size="small" multiline rows={3} fullWidth />
      </Paper>

      {/* J. Plan de tratamiento */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {up("J. PLAN DE TRATAMIENTO")}
        </Typography>

        <TextField label={up("Plan de tratamiento")} size="small" multiline rows={4} fullWidth />
      </Paper>

      
      {/* Acciones */}
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>
          {up("Guardar")}
        </Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>
          {up("Nueva Consulta")}
        </Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>
          {up("Editar")}
        </Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>
          {up("Imprimir")}
        </Button>
        <Button variant="contained" sx={{ background: "#1A3C6D" }}>
          {up("Exportar (PDF)")}
        </Button>
      </Stack>
    </Box>
  );
}