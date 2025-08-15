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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface ChequeData {
  valor: number | '';
  banco: string;
  noCuenta: string;
  nombreCuenta: string;
  noCheque: string;
  transferenciaBancaria: boolean;
}

export default function PagoCheque() {
  const [chequeData, setChequeData] = useState<ChequeData>({
    valor: '',
    banco: 'AMAZONAS',
    noCuenta: '',
    nombreCuenta: '',
    noCheque: '',
    transferenciaBancaria: false,
  });

  // Lista de bancos precargados
  const bancos = [
    'AMAZONAS',
    'BANCO PICHINCHA',
    'BANCO DEL PACIFICO',
    'BANCO DE GUAYAQUIL',
    'PRODUBANCO',
    'BANCO BOLIVARIANO',
    'BANCO INTERNACIONAL',
    'CITIBANK',
    'BANCO DEL AUSTRO',
    'COOPERATIVA JUVENTUD ECUATORIANA PROGRESISTA',
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

  // Configuración de "item" para simular columnas
  const itemStyle = {
    flexBasis: { xs: "100%", sm: "100%" },
    minWidth: "300px",
  };

  const handleInputChange = (field: keyof ChequeData, value: any) => {
    setChequeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistrar = () => {
    console.log('Datos de cheque registrados:', chequeData);
    // Aquí iría la lógica para registrar el pago con cheque
  };

  const handleCancelar = () => {
    // Limpiar los datos o cerrar el modal
    setChequeData({
      valor: '',
      banco: 'AMAZONAS',
      noCuenta: '',
      nombreCuenta: '',
      noCheque: '',
      transferenciaBancaria: false,
    });
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
        DATOS DEL CHEQUE
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
        {/* Valor */}
        <Box sx={itemStyle}>
          <TextField
            label="VALOR"
            type="number"
            value={chequeData.valor}
            onChange={(e) => handleInputChange('valor', Number(e.target.value) || '')}
            {...textFieldProps}
          />
        </Box>

        {/* Banco */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>BANCO</InputLabel>
            <Select
              label="BANCO"
              value={chequeData.banco}
              onChange={(e) => handleInputChange('banco', e.target.value)}
              {...selectProps}
            >
              {bancos.map((banco) => (
                <MenuItem key={banco} value={banco}>
                  {banco}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* No. De Cuenta */}
        <Box sx={itemStyle}>
          <TextField
            label="N° DE CUENTA"
            type="number"
            value={chequeData.noCuenta}
            onChange={(e) => handleInputChange('noCuenta', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* Nombre de Cuenta */}
        <Box sx={itemStyle}>
          <TextField
            label="NOMBRE DE CUENTA"
            value={chequeData.nombreCuenta}
            onChange={(e) => handleInputChange('nombreCuenta', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* No. De Cheque */}
        <Box sx={itemStyle}>
          <TextField
            label="N° DE CHEQUE"
            type="number"
            value={chequeData.noCheque}
            onChange={(e) => handleInputChange('noCheque', e.target.value)}
            {...textFieldProps}
          />
        </Box>
      </Box>
    </Paper>
  );
}