import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningIcon from '@mui/icons-material/Warning';
import HotelIcon from '@mui/icons-material/Hotel';

interface DatosPacienteData {
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  nombrePaciente: string;
  sexo: 'M' | 'F';
  edad: string;
  tipoPaciente: 'PARTICULAR' | 'SEGURO';
  numeroCama: string;
  tieneAlergiaMedicamentos: 'SI' | 'NO';
  tipoAlergia: string;
}

interface PacienteInfo {
  numeroDocumento: string;
  tipoDocumento: 'CEDULA' | 'PASAPORTE' | 'CARNET_REFUGIADO';
  numeroHistoriaClinica: string;
  numeroArchivo: string;
  nombreCompleto: string;
  sexo: 'M' | 'F';
  edad: number;
  tipoPaciente: 'PARTICULAR' | 'SEGURO';
  numeroCama: string;
  sala: string;
}

export default function DatosPaciente() {
  const [datosPaciente, setDatosPaciente] = useState<DatosPacienteData>({
    numeroHistoriaClinica: '',
    numeroArchivo: '',
    nombrePaciente: '',
    sexo: 'M',
    edad: '',
    tipoPaciente: 'PARTICULAR',
    numeroCama: '',
    tieneAlergiaMedicamentos: 'NO',
    tipoAlergia: '',
  });

  // Datos simulados del paciente (normalmente vendrían del sistema)
  const pacienteActual: PacienteInfo = {
    numeroDocumento: '0992567123',
    tipoDocumento: 'CEDULA',
    numeroHistoriaClinica: '9952',
    numeroArchivo: 'EST-2025-00321',
    nombreCompleto: 'ALCIVAR VALERO GEOVANNY ULICES',
    sexo: 'M',
    edad: 50,
    tipoPaciente: 'SEGURO',
    numeroCama: '201-A',
    sala: 'MEDICINA INTERNA'
  };

  // Tipos de alergias del control pre operatorio
  const tiposAlergias = [
    'PENICILINA',
    'ASPIRINA',
    'ANESTÉSICOS LOCALES',
    'YODO',
    'LATEX',
    'ANTIBIÓTICOS (CEFALOSPORINAS)',
    'ANTIINFLAMATORIOS (AINES)',
    'CONTRASTES RADIOLÓGICOS',
    'MORFINA',
    'CODEÍNA',
    'SULFAS',
    'DIPIRONA',
    'OTROS'
  ];

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { 
      readOnly: true,
      style: { fontSize: 12, height: 35, backgroundColor: '#F5F5F5' } 
    },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  const selectProps = {
    size: 'small' as const,
    fullWidth: true,
    sx: { fontSize: 12, height: 35, minHeight: 35 },
    MenuProps: { PaperProps: { style: { fontSize: 12 } } },
  };

  useEffect(() => {
    // Cargar datos del paciente
    setDatosPaciente(prev => ({
      ...prev,
      numeroHistoriaClinica: pacienteActual.numeroHistoriaClinica,
      numeroArchivo: pacienteActual.numeroArchivo,
      nombrePaciente: pacienteActual.nombreCompleto,
      sexo: pacienteActual.sexo,
      edad: `${pacienteActual.edad} Años`,
      tipoPaciente: pacienteActual.tipoPaciente,
      numeroCama: pacienteActual.numeroCama,
    }));
  }, []);

  const handleAlergiaChange = (valor: 'SI' | 'NO') => {
    setDatosPaciente(prev => ({
      ...prev,
      tieneAlergiaMedicamentos: valor,
      tipoAlergia: valor === 'NO' ? '' : prev.tipoAlergia
    }));
  };

  const handleTipoAlergiaChange = (valor: string) => {
    setDatosPaciente(prev => ({
      ...prev,
      tipoAlergia: valor
    }));
  };

  const getTipoDocumentoLabel = (tipo: string) => {
    switch (tipo) {
      case 'CEDULA': return 'CÉDULA';
      case 'PASAPORTE': return 'PASAPORTE';
      case 'CARNET_REFUGIADO': return 'CARNET REFUGIADO';
      default: return 'DOCUMENTO';
    }
  };

  const getSexoLabel = (sexo: string) => {
    return sexo === 'M' ? 'MASCULINO' : 'FEMENINO';
  };

  const getTipoPacienteColor = (tipo: string) => {
    return tipo === 'SEGURO' ? 'primary' : 'success';
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
        <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        DATOS DEL PACIENTE
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Fila 1 */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2, 
          mb: 3,
          alignItems: 'flex-end'
        }}>
          <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <TextField
              label="H.C."
              value={datosPaciente.numeroHistoriaClinica}
              {...textFieldProps}
            />
            
          </Box>
            <TextField
              label="N° ARCHIVO"
              value={datosPaciente.numeroArchivo}
              {...textFieldProps}
              helperText="Emitido por Estadística"
            />

          <Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 'bold' }}>
                {getTipoDocumentoLabel(pacienteActual.tipoDocumento)}:
              </Typography>
              <Chip 
                label={pacienteActual.numeroDocumento} 
                size="small" 
                color="info" 
                variant="outlined" 
              />
            </Box>
          </Box>

          

          <Box sx={{ flex: '1 1 150px', minWidth: '120px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HotelIcon sx={{ fontSize: 20, color: '#2196F3' }} />
              <Box>
                <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 'bold' }}>
                  CAMA: {datosPaciente.numeroCama}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: 10, color: '#666' }}>
                  SALA: {pacienteActual.sala}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Fila 2 */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 2, 
          mb: 3,
          alignItems: 'flex-end'
        }}>
          <Box sx={{ flex: '2 1 300px', minWidth: '250px' }}>
            <TextField
              label="NOMBRE PACIENTE"
              value={datosPaciente.nombrePaciente}
              {...textFieldProps}
            />
          </Box>

          <Box sx={{ flex: '1 1 120px', minWidth: '100px' }}>
            <TextField
              label="SEXO"
              value={getSexoLabel(datosPaciente.sexo)}
              {...textFieldProps}
            />
          </Box>

          <Box sx={{ flex: '1 1 120px', minWidth: '100px' }}>
            <TextField
              label="EDAD"
              value={datosPaciente.edad}
              {...textFieldProps}
            />
          </Box>

          <Box sx={{ flex: '1 1 150px', minWidth: '130px' }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 'bold', mb: 1 }}>
                TIPO PACIENTE:
              </Typography>
              <Chip
                label={datosPaciente.tipoPaciente}
                color={getTipoPacienteColor(datosPaciente.tipoPaciente)}
                variant="filled"
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}