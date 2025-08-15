import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const tiposDren = [
  "Jackson Pratt",
  "Tubular",
  "Hemovac",
  "Pleur-Evac",
  "Penrose"
];

function getColorByHora(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  const minutos = h * 60 + m;
  if (minutos >= 420 && minutos <= 1139) {
    return "#2356A8"; // Azul
  }
  return "#D32F2F"; // Rojo
}

function getFechaActual() {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy}`;
}

function getHoraActual() {
  const hoy = new Date();
  const hh = String(hoy.getHours()).padStart(2, "0");
  const min = String(hoy.getMinutes()).padStart(2, "0");
  return `${hh}:${min}`;
}

export default function Drenes() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [tipoDren, setTipoDren] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  // Simulación de usuario logueado
  const responsable = "LCDO/A (logeado)";

  const handleAgregar = () => {
    if (tipoDren && cantidad && caracteristicas) {
      const fecha = getFechaActual();
      const hora = getHoraActual();
      setRegistros([
        ...registros,
        { fecha, hora, tipoDren, cantidad, caracteristicas, responsable }
      ]);
      setTipoDren('');
      setCantidad('');
      setCaracteristicas('');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A3C6D", mb: 2 }}>
        REGISTRO DE DRENES QUIRÚRGICOS
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Tipo de Dren</InputLabel>
            <Select
              value={tipoDren}
              label="Tipo de Dren"
              onChange={e => setTipoDren(e.target.value)}
            >
              {tiposDren.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Cantidad que se elimina (ml)"
            type="number"
            size="small"
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            sx={{ minWidth: 160 }}
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Características del líquido"
            size="small"
            value={caracteristicas}
            onChange={e => setCaracteristicas(e.target.value)}
            sx={{ minWidth: 220, flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAgregar}
            sx={{ background: "#1A3C6D", fontWeight: "bold", minWidth: 120 }}
          >
            AGREGAR
          </Button>
        </Box>
      </Paper>
      <Box sx={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>FECHA</th>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>HORA</th>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>TIPO DE DREN</th>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>CANTIDAD QUE SE ELIMINA</th>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>CARACTERÍSTICAS DEL LÍQUIDO</th>
              <th style={{ border: "1px solid #222", padding: 8, color: "#2356A8", fontWeight: 800 }}>RESPONSABLE</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r, idx) => {
              const color = getColorByHora(r.hora);
              return (
                <tr key={idx}>
                  <td style={{ border: "1px solid #222", padding: 8, color, fontWeight: 700 }}>{r.fecha}</td>
                  <td style={{ border: "1px solid #222", padding: 8, color, fontWeight: 700 }}>{r.hora}</td>
                  <td style={{ border: "1px solid #222", padding: 8 }}>{r.tipoDren}</td>
                  <td style={{ border: "1px solid #222", padding: 8 }}>{r.cantidad} ml</td>
                  <td style={{ border: "1px solid #222", padding: 8 }}>{r.caracteristicas}</td>
                  <td style={{ border: "1px solid #222", padding: 8 }}>{r.responsable}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}