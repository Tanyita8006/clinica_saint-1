import React, { useState } from "react";
import { Box, Typography, Paper, Radio, RadioGroup, FormControlLabel, Divider } from "@mui/material";

const factores = [
  {
    nombre: "PERCEPCIÓN SENSORIAL",
    opciones: [
      { label: "Completamente limitada", valor: 4 },
      { label: "Muy limitada", valor: 3 },
      { label: "Ligeramente limitada", valor: 2 },
      { label: "Sin limitación", valor: 1 },
    ],
  },
  {
    nombre: "EXPOSICIÓN DE LA PIEL A LA HUMEDAD",
    opciones: [
      { label: "Constantemente húmeda", valor: 4 },
      { label: "Muy húmeda", valor: 3 },
      { label: "Ocasionalmente húmeda", valor: 2 },
      { label: "Raramente húmeda", valor: 1 },
    ],
  },
  {
    nombre: "ACTIVIDAD FÍSICA",
    opciones: [
      { label: "En cama", valor: 4 },
      { label: "En silla", valor: 3 },
      { label: "Camina ocasionalmente", valor: 2 },
      { label: "Camina frecuentemente", valor: 1 },
    ],
  },
  {
    nombre: "MOVILIDAD",
    opciones: [
      { label: "Completamente inmóvil", valor: 4 },
      { label: "Muy limitada", valor: 3 },
      { label: "Ligeramente limitada", valor: 2 },
      { label: "Sin limitación", valor: 1 },
    ],
  },
  {
    nombre: "NUTRICIÓN",
    opciones: [
      { label: "Muy pobre", valor: 4 },
      { label: "Probablemente inadecuada", valor: 3 },
      { label: "Adecuada", valor: 2 },
      { label: "Excelente", valor: 1 },
    ],
  },
  {
    nombre: "FRICCIÓN/DESPLAZAMIENTO",
    opciones: [
      { label: "Problema", valor: 3 },
      { label: "Potencial problema", valor: 2 },
      { label: "Sin problema aparente", valor: 1 },
    ],
  },
];

function getNivelRiesgo(total: number) {
  if (total <= 12) return { nivel: "BAJO", color: "#4CAF50" };
  if (total <= 15) return { nivel: "MEDIO", color: "#FFEB3B" };
  return { nivel: "ALTO", color: "#F44336" };
}

export default function RiesgoUlceras() {
  // Estado para cada factor
  const [seleccion, setSeleccion] = useState<number[]>(Array(factores.length).fill(0));

  // Calcular subtotales y total
  const subtotales = seleccion.map((valor) => valor);
  const total = subtotales.reduce((a, b) => a + b, 0);

  const { nivel, color } = getNivelRiesgo(total);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 2 }}>
        ESCALA DE RIESGO DE ÚLCERAS POR PRESIÓN (BRADEN)
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
       
        {factores.map((factor, idx) => (
          <Box key={factor.nombre} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>{factor.nombre}</Typography>
            <RadioGroup
              row
              value={seleccion[idx] || ""}
              onChange={e => {
                const nuevo = [...seleccion];
                nuevo[idx] = Number(e.target.value);
                setSeleccion(nuevo);
              }}
            >
              {factor.opciones.map((op) => (
                <FormControlLabel
                  key={op.label}
                  value={op.valor}
                  control={<Radio />}
                  label={`${op.label} (${op.valor})`}
                  sx={{ mr: 2 }}
                />
              ))}
            </RadioGroup>
           
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        {/* Fila de Total y nivel de riesgo */}
        <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            TOTAL: <span style={{ color }}>{total > 0 ? total : "-"}</span>
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            NIVEL DE RIESGO: <span style={{ color }}>{nivel}</span>
          </Typography>
          <span style={{
            display: "inline-block",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: color,
            border: "2px solid #888"
          }} />
        </Box>

        {/* Leyenda de niveles de riesgo */}
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          NIVELES DE RIESGO Y CUIDADO
        </Typography>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#4CAF50",
              border: "1px solid #888"
            }} />
            <Typography sx={{ fontWeight: "bold" }}>BAJO (1 A 12)</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#FFEB3B",
              border: "1px solid #888"
            }} />
            <Typography sx={{ fontWeight: "bold" }}>MEDIO (13 A 15)</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span style={{
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#F44336",
              border: "1px solid #888"
            }} />
            <Typography sx={{ fontWeight: "bold" }}>ALTO (16 A MÁS)</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}