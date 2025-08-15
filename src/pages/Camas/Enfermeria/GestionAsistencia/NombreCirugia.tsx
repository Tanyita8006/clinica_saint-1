import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Divider,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningIcon from '@mui/icons-material/Warning';

const datosComplementarios = [
  'Ayuno',
  'Prótesis bucal retirada',
  'Pre medicación',
  'Uñas despintadas',
  'Rasura y asepsia',
  'Vendaje M inferiores',
  'Bata quirúrgica',
  'Sonda Nasogástrica',
  'Sonda Vesical',
  'Micción',
  'Soluciones',
  'Antibióticos',
  'Transfusión Sanguínea',
  'Baño Pre quirúrgico',
];

const examenesComplementarios = [
  'Examen de Sangre',
  'EKG',
  'RX - TAC',
  'ECOGRAFIA',
];

export default function NombreCirugia() {
  const [form, setForm] = useState({
    nombreCirugia: '',
    pa: '',
    fc: '',
    fr: '',
    temp: '',
    spo2: '',
    peso: '',
    talla: '',
    alergias: '',
    tipoPaciente: '',
    datosComplementarios: Object.fromEntries(datosComplementarios.map(d => [d, 'NO'])),
    examenesComplementarios: Object.fromEntries(examenesComplementarios.map(e => [e, false])),
    observaciones: '',
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDatosComplementarios = (item: string, value: string) => {
    setForm(prev => ({
      ...prev,
      datosComplementarios: {
        ...prev.datosComplementarios,
        [item]: value,
      },
    }));
  };

  const handleExamenComplementario = (item: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      examenesComplementarios: {
        ...prev.examenesComplementarios,
        [item]: checked,
      },
    }));
  };

  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'left',
        }}
      >
        <LocalHospitalIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        GESTIÓN ASISTENCIA - CIRUGÍA
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Nombre de Cirugía */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Nombre de Cirugía"
            value={form.nombreCirugia}
            onChange={e => handleChange('nombreCirugia', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* Signos vitales */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 2 }}>
            SIGNOS VITALES
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="PA (mmHg)" value={form.pa} onChange={e => handleChange('pa', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="FC (x min)" value={form.fc} onChange={e => handleChange('fc', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="FR (x min)" value={form.fr} onChange={e => handleChange('fr', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="T° (°C)" value={form.temp} onChange={e => handleChange('temp', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="SPO2 (%)" value={form.spo2} onChange={e => handleChange('spo2', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="PESO (kg)" value={form.peso} onChange={e => handleChange('peso', e.target.value)} {...textFieldProps} />
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <TextField label="TALLA (cm)" value={form.talla} onChange={e => handleChange('talla', e.target.value)} {...textFieldProps} />
            </Box>
          </Box>
        </Box>

        {/* Alergias */}
        <Box sx={{ mb: 3 }}>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#FFF3E0', border: '1px solid #FFB74D' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WarningIcon sx={{ mr: 1, color: '#FF9800' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D' }}>
                ALERGIAS
              </Typography>
            </Box>
            <TextField
              label="Alergias"
              value={form.alergias}
              onChange={e => handleChange('alergias', e.target.value)}
              {...textFieldProps}
            />
          </Paper>
        </Box>

        {/* Tipo de paciente */}
        <Box sx={{ mb: 3 }}>
          <FormLabel sx={{ fontWeight: 'bold', color: '#1A3C6D' }}>Tipo de paciente</FormLabel>
          <RadioGroup
            row
            value={form.tipoPaciente}
            onChange={e => handleChange('tipoPaciente', e.target.value)}
          >
            <FormControlLabel value="Ambulatorio" control={<Radio />} label="Ambulatorio" />
            <FormControlLabel value="Hospitalización" control={<Radio />} label="Hospitalización" />
          </RadioGroup>
        </Box>

        {/* Datos complementarios */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
          DATOS COMPLEMENTARIOS
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {datosComplementarios.map(item => (
            <Box key={item} sx={{ flex: '1 1 220px', minWidth: '180px', mb: 2 }}>
              <FormLabel sx={{ fontSize: 13 }}>{item}</FormLabel>
              <RadioGroup
                row
                value={form.datosComplementarios[item]}
                onChange={e => handleDatosComplementarios(item, e.target.value)}
              >
                <FormControlLabel value="SI" control={<Radio />} label="SI" />
                <FormControlLabel value="NO" control={<Radio />} label="NO" />
              </RadioGroup>
            </Box>
          ))}
        </Box>

        {/* Exámenes complementarios */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1A3C6D', mb: 1 }}>
          EXÁMENES COMPLEMENTARIOS
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          {examenesComplementarios.map(item => (
            <Box key={item} sx={{ flex: '1 1 180px', minWidth: '150px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.examenesComplementarios[item]}
                    onChange={e => handleExamenComplementario(item, e.target.checked)}
                  />
                }
                label={item}
              />
            </Box>
          ))}
        </Box>

        {/* Observaciones */}
        <TextField
          label="Observaciones"
          value={form.observaciones}
          onChange={e => handleChange('observaciones', e.target.value)}
          fullWidth
          multiline
          minRows={2}
          size="small"
        />
      </Paper>
    </Box>
  );
}