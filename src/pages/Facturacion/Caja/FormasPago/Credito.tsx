import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CreditoData {
  codigoAutorizacion: string;
  valor: number | '';
  cedulaRucSolicitante: string;
  nombreSolicitante: string;
  motivo: string;
}

interface CodigoAutorizacion {
  codigo: string;
  valor: number;
  cliente: string;
  fechaVencimiento: string;
  usado: boolean;
}

export default function Credito() {
  const [creditoData, setCreditoData] = useState<CreditoData>({
    codigoAutorizacion: '',
    valor: '',
    cedulaRucSolicitante: '',
    nombreSolicitante: '',
    motivo: '',
  });

  const [medicoAutorizado, setMedicoAutorizado] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Códigos de autorización precargados (simulando datos de la base)
  const codigosAutorizacion: CodigoAutorizacion[] = [
    {
      codigo: 'PERSONAS CONVULIO',
      valor: 1504.43,
      cliente: 'EMPRESA MEDICAL XYZ',
      fechaVencimiento: '31/08/2025',
      usado: false,
    },
    {
      codigo: 'AUTH-12345',
      valor: 850.00,
      cliente: 'CORPORACIÓN SALUD ABC',
      fechaVencimiento: '30/09/2025',
      usado: false,
    },
    {
      codigo: 'CRED-67890',
      valor: 2200.75,
      cliente: 'CLINICA SANTA MARIA',
      fechaVencimiento: '15/10/2025',
      usado: false,
    },
  ];

  // Lista de motivos precargados
  const motivos = [
    'CONVENIO EMPRESARIAL',
    'TRATAMIENTO MÉDICO ESPECIALIZADO',
    'EMERGENCIA MÉDICA',
    'PROCEDIMIENTO QUIRÚRGICO',
    'REHABILITACIÓN',
    'OTROS',
  ];

  // Estilos comunes
  const textFieldProps = {
    size: 'small' as const,
    fullWidth: true,
    InputProps: { style: { fontSize: 12, height: 35 } },
    InputLabelProps: { style: { fontSize: 12, fontWeight: 'bold' } },
  };

  const selectProps = {
    size: 'small' as const,
    fullWidth: true,
    sx: { fontSize: 12, height: 35, minHeight: 35 },
    MenuProps: { PaperProps: { style: { fontSize: 12 } } },
  };

  const itemStyle = {
    flexBasis: { xs: "100%", sm: "100%" },
    minWidth: "300px",
  };

  const handleInputChange = (field: keyof CreditoData, value: any) => {
    setCreditoData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleCodigoChange = (codigo: string) => {
    const codigoEncontrado = codigosAutorizacion.find(c => c.codigo === codigo);
    
    if (codigoEncontrado) {
      setCreditoData(prev => ({
        ...prev,
        codigoAutorizacion: codigo,
        valor: codigoEncontrado.valor,
      }));
    } else {
      setCreditoData(prev => ({
        ...prev,
        codigoAutorizacion: codigo,
        valor: '',
      }));
    }
  };

  const buscarSolicitante = () => {
    // Simulación de búsqueda de solicitante
    const solicitantes = [
      { cedula: '0102030405', nombre: 'DR. JUAN CARLOS PÉREZ GÓMEZ' },
      { cedula: '0987654321', nombre: 'DRA. MARÍA ELENA RODRÍGUEZ LÓPEZ' },
      { cedula: '1234567890', nombre: 'DR. CARLOS ALBERTO MENDOZA SILVA' },
    ];

    const solicitante = solicitantes.find(s => s.cedula === creditoData.cedulaRucSolicitante) || solicitantes[0];
    
    // Verificar si es médico autorizado
    const esAutorizado = solicitante.nombre.includes('DR.') || solicitante.nombre.includes('DRA.');
    setMedicoAutorizado(esAutorizado);
    
    if (esAutorizado) {
      setCreditoData(prev => ({
        ...prev,
        nombreSolicitante: solicitante.nombre,
      }));
      setErrorMessage('');
    } else {
      setErrorMessage('Solo médicos autorizados pueden solicitar crédito');
    }
  };

  const handleRegistrar = () => {
    if (!creditoData.motivo) {
      setErrorMessage('El motivo es obligatorio');
      return;
    }

    if (!medicoAutorizado) {
      setErrorMessage('Solo médicos autorizados pueden solicitar crédito');
      return;
    }

    console.log('Datos de crédito registrados:', creditoData);
    // Aquí iría la lógica para registrar el crédito
    setErrorMessage('');
  };

  const handleCancelar = () => {
    setCreditoData({
      codigoAutorizacion: '',
      valor: '',
      cedulaRucSolicitante: '',
      nombreSolicitante: '',
      motivo: '',
    });
    setMedicoAutorizado(false);
    setErrorMessage('');
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        border: '2px solid #4A90E2',
        borderRadius: 2,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1A3C6D',
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        DATOS DEL CRÉDITO
      </Typography>

      {/* Alerta para médicos no autorizados */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: 12 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* Código de Autorización */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>CÓDIGO AUTORIZACIÓN</InputLabel>
            <Select
              label="CÓDIGO AUTORIZACIÓN"
              value={creditoData.codigoAutorizacion}
              onChange={(e) => handleCodigoChange(e.target.value)}
              {...selectProps}
            >
              {codigosAutorizacion.map((codigo) => (
                <MenuItem key={codigo.codigo} value={codigo.codigo}>
                  {codigo.codigo} - ${codigo.valor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Valor */}
        <Box sx={itemStyle}>
          <TextField
            label="VALOR"
            type="number"
            value={creditoData.valor}
            disabled
            sx={{
              ...textFieldProps,
              backgroundColor: '#FFF9C4', // Color amarillo como en la imagen
            }}
            InputProps={{
              ...textFieldProps.InputProps,
              style: { 
                ...textFieldProps.InputProps.style,
                backgroundColor: '#FFF9C4',
              }
            }}
          />
        </Box>

        {/* Cédula/RUC del Solicitante */}
        <Box sx={itemStyle}>
          <TextField
            label="CÉDULA/RUC DEL SOLICITANTE"
            value={creditoData.cedulaRucSolicitante}
            onChange={(e) => handleInputChange('cedulaRucSolicitante', e.target.value)}
            {...textFieldProps}
            InputProps={{
              ...textFieldProps.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={buscarSolicitante} size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Nombre del Solicitante */}
        <Box sx={itemStyle}>
          <TextField
            label="NOMBRE DEL SOLICITANTE"
            value={creditoData.nombreSolicitante}
            disabled
            {...textFieldProps}
          />
        </Box>

        {/* Motivo */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold', color: 'red' }}>
              MOTIVO *
            </InputLabel>
            <Select
              label="MOTIVO *"
              value={creditoData.motivo}
              onChange={(e) => handleInputChange('motivo', e.target.value)}
              {...selectProps}
              required
            >
              {motivos.map((motivo) => (
                <MenuItem key={motivo} value={motivo}>
                  {motivo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Información del médico autorizado */}
        {medicoAutorizado && (
          <Alert severity="success" sx={{ fontSize: 12 }}>
            ✓ Médico autorizado para crédito
          </Alert>
        )}
      </Box>
    </Paper>
  );
}