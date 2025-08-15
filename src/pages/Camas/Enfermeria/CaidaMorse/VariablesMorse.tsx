import React, { useState } from 'react';
import { Box, Typography, Paper, FormControlLabel, Checkbox, Radio, RadioGroup, Divider } from '@mui/material';

export default function VariablesMorse() {
  // 1. CAÍDA PREVIA
  const [caidaPrevia, setCaidaPrevia] = useState('');
  // 2. COMORBILIDADES
  const [comorbilidades, setComorbilidades] = useState('');
  // 3. AYUDA PARA DEAMBULAR
  const [ayudaDeambular, setAyudaDeambular] = useState('');
  // 4. VENOCLISIS
  const [venoclisis, setVenoclisis] = useState('');
  // 5. MARCHA
  const [marcha, setMarcha] = useState('');
  // 6. ESTADO MENTAL
  const [estadoMental, setEstadoMental] = useState('');

  // PUNTAJES
  const puntajeCaidaPrevia = caidaPrevia === 'SI' ? 25 : 0;
  const puntajeComorbilidades = comorbilidades === 'SI' ? 15 : 0;
  const puntajeAyudaDeambular =
    ayudaDeambular === 'BASTÓN/MULETA/CAMINADOR'
      ? 15
      : ayudaDeambular === 'SE APOYA EN LOS MUEBLES'
      ? 30
      : 0;
  const puntajeVenoclisis = venoclisis === 'SI' ? 20 : 0;
  const puntajeMarcha =
    marcha === 'DÉBIL'
      ? 10
      : marcha === 'LIMITADA'
      ? 20
      : 0;
  const puntajeEstadoMental = estadoMental === 'SOBREESTIMA U OLVIDA SUS LIMITACIONES' ? 15 : 0;

  const puntajeFinal =
    puntajeCaidaPrevia +
    puntajeComorbilidades +
    puntajeAyudaDeambular +
    puntajeVenoclisis +
    puntajeMarcha +
    puntajeEstadoMental;

  let nivelRiesgo = '';
  let color = '';
  if (puntajeFinal <= 25) {
    nivelRiesgo = 'BAJO';
    color = '#4CAF50';
  } else if (puntajeFinal <= 50) {
    nivelRiesgo = 'MEDIO';
    color = '#FFEB3B';
  } else {
    nivelRiesgo = 'ALTO';
    color = '#F44336';
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 2 }}>
        ESCALA DE RIESGO DE CAÍDA DE MORSE
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        {/* 1. CAÍDA PREVIA */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>1. CAÍDA PREVIA</Typography>
        <RadioGroup
          row
          value={caidaPrevia}
          onChange={e => setCaidaPrevia(e.target.value)}
        >
          <FormControlLabel value="NO" control={<Radio />} label="NO (0)" />
          <FormControlLabel value="SI" control={<Radio />} label="SI (25)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 2. COMORBILIDADES */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>2. COMORBILIDADES</Typography>
        <RadioGroup
          row
          value={comorbilidades}
          onChange={e => setComorbilidades(e.target.value)}
        >
          <FormControlLabel value="NO" control={<Radio />} label="NO (0)" />
          <FormControlLabel value="SI" control={<Radio />} label="SI (15)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 3. AYUDA PARA DEAMBULAR */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>3. AYUDA PARA DEAMBULAR</Typography>
        <RadioGroup
          value={ayudaDeambular}
          onChange={e => setAyudaDeambular(e.target.value)}
        >
          <FormControlLabel value="NINGUNA/REPOSO EN CAMA/ASISTENCIA" control={<Radio />} label="NINGUNA/REPOSO EN CAMA/ASISTENCIA (0)" />
          <FormControlLabel value="BASTÓN/MULETA/CAMINADOR" control={<Radio />} label="BASTÓN/MULETA/CAMINADOR (15)" />
          <FormControlLabel value="SE APOYA EN LOS MUEBLES" control={<Radio />} label="SE APOYA EN LOS MUEBLES (30)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 4. VENOCLISIS */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>4. VENOCLISIS</Typography>
        <RadioGroup
          row
          value={venoclisis}
          onChange={e => setVenoclisis(e.target.value)}
        >
          <FormControlLabel value="NO" control={<Radio />} label="NO (0)" />
          <FormControlLabel value="SI" control={<Radio />} label="SI (20)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 5. MARCHA */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>5. MARCHA</Typography>
        <RadioGroup
          value={marcha}
          onChange={e => setMarcha(e.target.value)}
        >
          <FormControlLabel value="NORMAL/REPOSO EN CAMA/SILLA DE RUEDAS" control={<Radio />} label="NORMAL/REPOSO EN CAMA/SILLA DE RUEDAS (0)" />
          <FormControlLabel value="DÉBIL" control={<Radio />} label="DÉBIL (10)" />
          <FormControlLabel value="LIMITADA" control={<Radio />} label="LIMITADA (20)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 6. ESTADO MENTAL */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>6. ESTADO MENTAL</Typography>
        <RadioGroup
          value={estadoMental}
          onChange={e => setEstadoMental(e.target.value)}
        >
          <FormControlLabel value="RECONOCE SUS LIMITACIONES" control={<Radio />} label="RECONOCE SUS LIMITACIONES (0)" />
          <FormControlLabel value="SOBREESTIMA U OLVIDA SUS LIMITACIONES" control={<Radio />} label="SOBREESTIMA U OLVIDA SUS LIMITACIONES (15)" />
        </RadioGroup>
        <Divider sx={{ my: 2 }} />

        {/* 7. PUNTUACIÓN FINAL Y NIVEL DEL RIESGO */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            7. PUNTUACIÓN FINAL: <span style={{ color }}>{puntajeFinal}</span>
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

        {/* 8. Tabla de acciones */}
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
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>0 A 25</td>
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
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>25 A 50</td>
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
                  <td style={{ border: '1px solid #bbb', padding: 6 }}>MAYOR A 50</td>
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