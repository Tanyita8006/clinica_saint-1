import React, { useState } from 'react';
import { Box, Typography, Paper, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@mui/material';

const edadOpciones = [
  { label: 'RECIÉN NACIDO', puntaje: 2 },
  { label: 'LACTANTE MENOR', puntaje: 2 },
  { label: 'LACTANTE MAYOR', puntaje: 3 },
  { label: 'PRE – ESCOLAR', puntaje: 3 },
  { label: 'ESCOLAR', puntaje: 1 },
];

const antecedentesOpciones = [
  { label: 'HIPERACTIVIDAD', puntaje: 1 },
  { label: 'PROBLEMAS NEUROMUSCULARES', puntaje: 1 },
  { label: 'SÍNDROME CONVULSIVO', puntaje: 1 },
  { label: 'DAÑO ORGÁNICO CEREBRAL', puntaje: 1 },
  { label: 'OTROS', puntaje: 1 },
  { label: 'SIN ANTECEDENTES', puntaje: 0 },
];

export default function Variables() {
  const [edad, setEdad] = useState('');
  const [caidaPrevia, setCaidaPrevia] = useState('');
  const [antecedentes, setAntecedentes] = useState<string[]>([]);
  const [conciencia, setConciencia] = useState('');
  
  // Calcular puntaje edad
  const puntajeEdad = edadOpciones.find(e => e.label === edad)?.puntaje || 0;
  // Caída previa
  const puntajeCaidaPrevia = caidaPrevia === 'SI' ? 1 : 0;
  // Antecedentes
  const puntajeAntecedentes = antecedentes.includes('SIN ANTECEDENTES')
    ? 0
    : antecedentesOpciones
        .filter(a => antecedentes.includes(a.label))
        .reduce((sum, a) => sum + a.puntaje, 0);
  // Conciencia
  const puntajeConciencia = conciencia === 'SI' ? 1 : 0;

  const puntajeFinal = puntajeEdad + puntajeCaidaPrevia + puntajeAntecedentes + puntajeConciencia;

  let nivelRiesgo = '';
  let color = '';
  if (puntajeFinal <= 1) {
    nivelRiesgo = 'BAJO';
    color = '#4CAF50';
  } else if (puntajeFinal <= 3) {
    nivelRiesgo = 'MEDIO';
    color = '#FFEB3B';
  } else {
    nivelRiesgo = 'ALTO';
    color = '#F44336';
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 2 }}>
        VARIABLES DE RIESGO DE CAÍDA
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        {/* 1. EDAD */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>1. EDAD</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          {edadOpciones.map(op => (
            <FormControlLabel
              key={op.label}
              control={
                <Radio
                  checked={edad === op.label}
                  onChange={() => setEdad(op.label)}
                />
              }
              label={`${op.label} (${op.puntaje})`}
            />
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 2. ANTECEDENTES DE CAÍDA PREVIA */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>2. ANTECEDENTES DE CAÍDA PREVIA</Typography>
        <RadioGroup
          row
          value={caidaPrevia}
          onChange={e => setCaidaPrevia(e.target.value)}
        >
          <FormControlLabel value="NO" control={<Radio />} label="NO (0)" />
          <FormControlLabel value="SI" control={<Radio />} label="SI (1)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 3. ANTECEDENTES */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>3. ANTECEDENTES</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          {antecedentesOpciones.map(op => (
            <FormControlLabel
              key={op.label}
              control={
                <Checkbox
                  checked={antecedentes.includes(op.label)}
                  onChange={e => {
                    if (op.label === 'SIN ANTECEDENTES') {
                      setAntecedentes(e.target.checked ? ['SIN ANTECEDENTES'] : []);
                    } else {
                      setAntecedentes(prev => {
                        let arr = prev.filter(a => a !== 'SIN ANTECEDENTES');
                        if (e.target.checked) arr.push(op.label);
                        else arr = arr.filter(a => a !== op.label);
                        return arr;
                      });
                    }
                  }}
                />
              }
              label={`${op.label} (${op.puntaje})`}
            />
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* 4. COMPROMISO DE CONCIENCIA */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>4. COMPROMISO DE CONCIENCIA</Typography>
        <RadioGroup
          row
          value={conciencia}
          onChange={e => setConciencia(e.target.value)}
        >
          <FormControlLabel value="NO" control={<Radio />} label="NO (0)" />
          <FormControlLabel value="SI" control={<Radio />} label="SI (1)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 5. PUNTUACIÓN FINAL Y NIVEL DEL RIESGO */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            5. PUNTUACIÓN FINAL: <span style={{ color }}>{puntajeFinal}</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            NIVEL DE RIESGO: <span style={{ color }}>{nivelRiesgo}</span>
            <span style={{
              display: 'inline-block',
              marginLeft: 12,
              verticalAlign: 'middle',
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: color,
              border: '2px solid #888'
            }} />
          </Typography>
        </Box>

        {/* 6. Tabla de acciones */}
        <Paper elevation={0} sx={{ mt: 2, p: 2, background: '#F5F5F5' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ACCIONES SEGÚN NIVEL DE RIESGO
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#E3F2FD' }}>
                  <th style={{ border: '1px solid #bbb', padding: 6 }}>RIESGO</th>
                  <th style={{ border: '1px solid #bbb', padding: 6 }}>PUNTAJE</th>
                  <th style={{ border: '1px solid #bbb', padding: 6 }}>ACCIÓN</th>
                  <th style={{ border: '1px solid #bbb', padding: 6 }}>CUIDADO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>BAJO</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>0 A 1</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>CUIDADOS BAJO ENFERMERÍA</td>
                  <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#4CAF50',
                      border: '1px solid #888'
                    }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>MEDIO</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>2 A 3</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>IMPLEMENTACIÓN DEL PLAN DE PREVENCIÓN</td>
                  <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#FFEB3B',
                      border: '1px solid #888'
                    }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>ALTO</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>4 A 6</td>
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>IMPLEMENTACIÓN DE MEDIDAS ESPECIALES</td>
                  <td style={{ border: '1px solid #bbb', padding: 6, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#F44336',
                      border: '1px solid #888'
                    }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
}