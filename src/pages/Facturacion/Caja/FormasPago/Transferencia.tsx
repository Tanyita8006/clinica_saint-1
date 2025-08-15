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

interface TransferenciaData {
  bancoDestino: string;
  valor: string;
  bancoProveniente: string;
  nombreCuenta: string;
  numeroComprobante: string;
  numeroFactura: string;
}

export default function Transferencia() {
  const [transferenciaData, setTransferenciaData] = useState<TransferenciaData>({
    bancoDestino: '',
    valor: '',
    bancoProveniente: '',
    nombreCuenta: '',
    numeroComprobante: '',
    numeroFactura: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Bancos de la clínica (cuentas propias)
  const bancosClinica = [
    'BANCO PICHINCHA - CTA CORRIENTE 2100123456',
    'BANCO DEL PACIFICO - CTA AHORROS 4200987654',
    'PRODUBANCO - CTA CORRIENTE 1500567890',
    'BANCO DE GUAYAQUIL - CTA AHORROS 3400112233',
    'BANCO BOLIVARIANO - CTA CORRIENTE 5600445566',
  ];

  // Bancos provenientes (todos los bancos disponibles)
  const bancosProvenientes = [
    'BANCO PICHINCHA',
    'BANCO DEL PACIFICO',
    'BANCO DE GUAYAQUIL',
    'PRODUBANCO',
    'BANCO BOLIVARIANO',
    'BANCO INTERNACIONAL',
    'CITIBANK',
    'BANCO DEL AUSTRO',
    'BANCO SOLIDARIO',
    'COOPERATIVA JUVENTUD ECUATORIANA PROGRESISTA',
    'COOPERATIVA DE AHORRO Y CREDITO ANDALUCIA',
    'MUTUALISTA PICHINCHA',
    'BANCO MACHALA',
    'BANCO PROCREDIT',
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
    flexBasis: { xs: "100%", sm: "48%" },
    minWidth: "200px",
  };

  const handleInputChange = (field: keyof TransferenciaData, value: string) => {
    setTransferenciaData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar mensajes cuando el usuario empiece a escribir
    if (errorMessage || successMessage) {
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleRegistrar = () => {
    // Validaciones de campos obligatorios
    if (!transferenciaData.bancoDestino) {
      setErrorMessage('El banco destino es obligatorio');
      return;
    }

    if (!transferenciaData.valor) {
      setErrorMessage('El valor es obligatorio');
      return;
    }

    if (!transferenciaData.bancoProveniente) {
      setErrorMessage('El banco proveniente es obligatorio');
      return;
    }

    if (!transferenciaData.numeroComprobante) {
      setErrorMessage('El número de comprobante es obligatorio');
      return;
    }

    // Validar que el valor sea un número válido
    const valorNumerico = parseFloat(transferenciaData.valor.replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErrorMessage('El valor debe ser un número válido mayor a 0');
      return;
    }

    // Registrar la transferencia
    console.log('Transferencia registrada:', {
      ...transferenciaData,
      valorNumerico,
      fecha: new Date().toISOString(),
    });

    setSuccessMessage(`Transferencia de $${valorNumerico.toFixed(2)} registrada correctamente`);
    setErrorMessage('');
    
    // Limpiar formulario después de un tiempo
    setTimeout(() => {
      handleCancelar();
    }, 2000);
  };

  const handleCancelar = () => {
    setTransferenciaData({
      bancoDestino: '',
      valor: '',
      bancoProveniente: '',
      nombreCuenta: '',
      numeroComprobante: '',
      numeroFactura: '',
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
        TRANSFERENCIA BANCARIA
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

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        {/* Banco Destino */}
        <Box sx={{ flexBasis: "100%", minWidth: "300px" }}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>BANCO DESTINO *</InputLabel>
            <Select
              label="BANCO DESTINO *"
              value={transferenciaData.bancoDestino}
              onChange={(e) => handleInputChange('bancoDestino', e.target.value)}
              {...selectProps}
            >
              {bancosClinica.map((banco) => (
                <MenuItem key={banco} value={banco}>
                  {banco}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Valor */}
        <Box sx={itemStyle}>
          <TextField
            label="VALOR *"
            value={transferenciaData.valor}
            onChange={(e) => handleInputChange('valor', e.target.value)}
            placeholder="0.00"
            {...textFieldProps}
          />
        </Box>

        {/* Banco Proveniente */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>BANCO PROVENIENTE *</InputLabel>
            <Select
              label="BANCO PROVENIENTE *"
              value={transferenciaData.bancoProveniente}
              onChange={(e) => handleInputChange('bancoProveniente', e.target.value)}
              {...selectProps}
            >
              {bancosProvenientes.map((banco) => (
                <MenuItem key={banco} value={banco}>
                  {banco}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Nombre de Cuenta */}
        <Box sx={itemStyle}>
          <TextField
            label="NOMBRE DE CUENTA (Opcional)"
            value={transferenciaData.nombreCuenta}
            onChange={(e) => handleInputChange('nombreCuenta', e.target.value)}
            placeholder="Nombre del titular de la cuenta"
            {...textFieldProps}
          />
        </Box>

        {/* Número de Comprobante */}
        <Box sx={itemStyle}>
          <TextField
            label="N° DE COMPROBANTE *"
            type="number"
            value={transferenciaData.numeroComprobante}
            onChange={(e) => handleInputChange('numeroComprobante', e.target.value)}
            placeholder="Número del comprobante"
            {...textFieldProps}
          />
        </Box>

        {/* N° Factura */}
        <Box sx={itemStyle}>
          <TextField
            label="N° FACTURA (Opcional)"
            type="number"
            value={transferenciaData.numeroFactura}
            onChange={(e) => handleInputChange('numeroFactura', e.target.value)}
            placeholder="Número de factura"
            {...textFieldProps}
          />
        </Box>
      </Box>

      {/* Información adicional */}
      {transferenciaData.bancoDestino && transferenciaData.bancoProveniente && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: '#F5F5F5', borderRadius: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
            RESUMEN DE LA TRANSFERENCIA:
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            • Origen: {transferenciaData.bancoProveniente}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            • Destino: {transferenciaData.bancoDestino}
          </Typography>
          {transferenciaData.valor && (
            <Typography variant="caption" sx={{ display: 'block', color: 'green', fontWeight: 'bold' }}>
              • Valor: ${transferenciaData.valor}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
}