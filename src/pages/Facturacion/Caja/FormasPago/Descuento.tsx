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
} from '@mui/material';

interface DescuentoData {
  codigoAutorizacion: string;
  valor: number | '';
  motivo: string;
}

interface CodigoDescuento {
  codigo: string;
  valor: number;
  descripcion: string;
  fechaVencimiento: string;
  usado: boolean;
}

export default function Descuento() {
  const [descuentoData, setDescuentoData] = useState<DescuentoData>({
    codigoAutorizacion: '',
    valor: '',
    motivo: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Códigos de autorización de descuento precargados (autorizados por Contabilidad)
  const codigosDescuento: CodigoDescuento[] = [
    {
      codigo: 'DESC-001',
      valor: 50.00,
      descripcion: 'Descuento por convenio empresarial',
      fechaVencimiento: '31/08/2025',
      usado: false,
    },
    {
      codigo: 'DESC-002',
      valor: 100.00,
      descripcion: 'Descuento por caso social',
      fechaVencimiento: '30/09/2025',
      usado: false,
    },
    {
      codigo: 'DESC-003',
      valor: 75.50,
      descripcion: 'Descuento por tercera edad',
      fechaVencimiento: '15/10/2025',
      usado: false,
    },
    {
      codigo: 'DESC-004',
      valor: 200.00,
      descripcion: 'Descuento por discapacidad',
      fechaVencimiento: '31/12/2025',
      usado: false,
    },
  ];

  // Lista de motivos precargados
  const motivos = [
    'CONVENIO EMPRESARIAL',
    'CASO SOCIAL',
    'TERCERA EDAD',
    'DISCAPACIDAD',
    'EMPLEADO DE LA CLINICA',
    'FAMILIAR DE EMPLEADO',
    'PACIENTE RECURRENTE',
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

  const handleInputChange = (field: keyof DescuentoData, value: any) => {
    setDescuentoData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar mensajes cuando el usuario empiece a escribir
    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleCodigoChange = (codigo: string) => {
    const codigoEncontrado = codigosDescuento.find(c => c.codigo === codigo);
    
    if (codigoEncontrado) {
      if (codigoEncontrado.usado) {
        setErrorMessage('Este código ya ha sido utilizado');
        return;
      }

      // Verificar fecha de vencimiento (simulado)
      const fechaActual = new Date();
      const fechaVencimiento = new Date(codigoEncontrado.fechaVencimiento.split('/').reverse().join('-'));
      
      if (fechaActual > fechaVencimiento) {
        setErrorMessage('Este código ha expirado');
        return;
      }

      setDescuentoData(prev => ({
        ...prev,
        codigoAutorizacion: codigo,
        valor: codigoEncontrado.valor,
      }));
      
      setErrorMessage('');
    } else {
      setDescuentoData(prev => ({
        ...prev,
        codigoAutorizacion: codigo,
        valor: '',
      }));
    }
  };

  const handleRegistrar = () => {
    if (!descuentoData.motivo) {
      setErrorMessage('El motivo es obligatorio');
      return;
    }

    if (!descuentoData.codigoAutorizacion) {
      setErrorMessage('Debe seleccionar un código de autorización');
      return;
    }

    if (!descuentoData.valor) {
      setErrorMessage('El valor del descuento no puede estar vacío');
      return;
    }

    // Simular el proceso de aplicar el descuento
    console.log('Descuento aplicado:', descuentoData);
    
    // Marcar el código como usado (en una implementación real esto se haría en el backend)
    const codigoIndex = codigosDescuento.findIndex(c => c.codigo === descuentoData.codigoAutorizacion);
    if (codigoIndex !== -1) {
      codigosDescuento[codigoIndex].usado = true;
    }

    setSuccessMessage(`Descuento de $${descuentoData.valor} aplicado correctamente`);
    setErrorMessage('');
    
    // Limpiar el formulario después de aplicar el descuento
    setTimeout(() => {
      handleCancelar();
    }, 2000);
  };

  const handleCancelar = () => {
    setDescuentoData({
      codigoAutorizacion: '',
      valor: '',
      motivo: '',
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        border: '2px solid #4A90E2',
        borderRadius: 2,
        maxWidth: 500,
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
        DESCUENTO PACIENTE
      </Typography>

      {/* Alertas */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: 12 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: 12 }}>
          {successMessage}
        </Alert>
      )}

      {/* Información sobre autorización */}
      <Alert severity="info" sx={{ mb: 2, fontSize: 11 }}>
        Los descuentos deben estar autorizados por el área de Contabilidad mediante un código y valor específico.
      </Alert>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* Código de Autorización de Descuento */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>CÓDIGO DE AUTORIZACIÓN</InputLabel>
            <Select
              label="CÓDIGO DE AUTORIZACIÓN"
              value={descuentoData.codigoAutorizacion}
              onChange={(e) => handleCodigoChange(e.target.value)}
              {...selectProps}
            >
              {codigosDescuento
                .filter(codigo => !codigo.usado)
                .map((codigo) => (
                <MenuItem key={codigo.codigo} value={codigo.codigo}>
                  {codigo.codigo} - ${codigo.valor} - {codigo.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Valor del Descuento */}
        <Box sx={itemStyle}>
          <TextField
            label="VALOR DEL DESCUENTO"
            type="number"
            value={descuentoData.valor}
            disabled
            sx={{
              ...textFieldProps,
              backgroundColor: '#E8F5E8', // Color verde claro para descuentos
            }}
            InputProps={{
              ...textFieldProps.InputProps,
              style: { 
                ...textFieldProps.InputProps.style,
                backgroundColor: '#E8F5E8',
              }
            }}
          />
        </Box>

        {/* Motivo */}
        <Box sx={itemStyle}>
          <TextField
            label="MOTIVO *"
            value={descuentoData.motivo}
            onChange={(e) => handleInputChange('motivo', e.target.value)}
            placeholder="Ingrese el motivo del descuento"
            multiline
            rows={2}
            required
            {...textFieldProps}
            InputLabelProps={{ 
              ...textFieldProps.InputLabelProps,
              style: { 
                ...textFieldProps.InputLabelProps.style,
                color: 'red' 
              }
            }}
            InputProps={{
              ...textFieldProps.InputProps,
              style: { 
                ...textFieldProps.InputProps.style,
                height: 'auto',
                minHeight: 60,
              }
            }}
          />
        </Box>

        {/* Información del código seleccionado */}
        {descuentoData.codigoAutorizacion && (
          <Box sx={{ p: 2, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
              DETALLES DEL DESCUENTO:
            </Typography>
            {codigosDescuento
              .filter(c => c.codigo === descuentoData.codigoAutorizacion)
              .map(codigo => (
                <Box key={codigo.codigo}>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    • Descripción: {codigo.descripcion}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    • Valor: ${codigo.valor}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    • Válido hasta: {codigo.fechaVencimiento}
                  </Typography>
                </Box>
              ))
            }
          </Box>
        )}
      </Box>
     
    </Paper>
  );
}