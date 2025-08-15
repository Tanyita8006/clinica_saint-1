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
} from '@mui/material';

interface TarjetaData {
  valor: number | '';
  banco: string;
  emisor: string;
  noTarjeta: string;
  noAprobacion: string;
  tipoPago: string;
  plazo: number | '';
  interes: number | '';
  lote: string;
  referencia: string;
}

export default function PagoTarjeta() {
  const [tarjetaData, setTarjetaData] = useState<TarjetaData>({
    valor: '',
    banco: 'AMAZONAS',
    emisor: 'CASH DEL ECUADOR',
    noTarjeta: '',
    noAprobacion: '',
    tipoPago: 'CORRIENTE',
    plazo: '',
    interes: '',
    lote: '',
    referencia: '',
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
  ];

  // Lista de emisores precargados
  const emisores = [
    'CASH DEL ECUADOR',
    'VISA',
    'MASTERCARD',
    'AMERICAN EXPRESS',
    'DINERS CLUB',
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
    flexBasis: { xs: "100%", sm: "48%" },
    minWidth: "200px",
  };

  const handleInputChange = (field: keyof TarjetaData, value: any) => {
    setTarjetaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistrar = () => {
    console.log('Datos de tarjeta registrados:', tarjetaData);
    // Aquí iría la lógica para registrar el pago
  };

  const handleCancelar = () => {
    // Limpiar los datos o cerrar el modal
    setTarjetaData({
      valor: '',
      banco: 'AMAZONAS',
      emisor: 'CASH DEL ECUADOR',
      noTarjeta: '',
      noAprobacion: '',
      tipoPago: 'CORRIENTE',
      plazo: '',
      interes: '',
      lote: '',
      referencia: '',
    });
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
        DATOS DE LA TARJETA
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
        {/* Valor */}
        <Box sx={itemStyle}>
          <TextField
            label="VALOR"
            type="number"
            value={tarjetaData.valor}
            onChange={(e) => handleInputChange('valor', Number(e.target.value) || '')}
            {...textFieldProps}
          />
        </Box>

        {/* Espacio vacío para que Valor quede solo en la primera fila */}
        <Box sx={itemStyle}></Box>

        {/* Banco */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>BANCO</InputLabel>
            <Select
              label="BANCO"
              value={tarjetaData.banco}
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

        {/* Emisor */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>EMISOR</InputLabel>
            <Select
              label="EMISOR"
              value={tarjetaData.emisor}
              onChange={(e) => handleInputChange('emisor', e.target.value)}
              {...selectProps}
            >
              {emisores.map((emisor) => (
                <MenuItem key={emisor} value={emisor}>
                  {emisor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* No. Tarjeta */}
        <Box sx={itemStyle}>
          <TextField
            label="N° TARJETA"
            value={tarjetaData.noTarjeta}
            onChange={(e) => handleInputChange('noTarjeta', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* No. De Aprobación */}
        <Box sx={itemStyle}>
          <TextField
            label="N° APROBACIÓN"
            value={tarjetaData.noAprobacion}
            onChange={(e) => handleInputChange('noAprobacion', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* Tipo de Pago */}
        <Box sx={itemStyle}>
          <FormControl {...selectProps}>
            <InputLabel sx={{ fontWeight: 'bold' }}>TIPO DE PAGO</InputLabel>
            <Select
              label="TIPO DE PAGO"
              value={tarjetaData.tipoPago}
              onChange={(e) => handleInputChange('tipoPago', e.target.value)}
              {...selectProps}
            >
              <MenuItem value="CORRIENTE">CORRIENTE</MenuItem>
              <MenuItem value="DIFERIDO">DIFERIDO</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Plazo */}
        <Box sx={itemStyle}>
          <TextField
            label="PLAZO"
            type="number"
            value={tarjetaData.plazo}
            onChange={(e) => handleInputChange('plazo', Number(e.target.value) || '')}
            {...textFieldProps}
          />
        </Box>

        {/* Lote */}
        <Box sx={itemStyle}>
          <TextField
            label="LOTE"
            value={tarjetaData.lote}
            onChange={(e) => handleInputChange('lote', e.target.value)}
            {...textFieldProps}
          />
        </Box>

        {/* Referencia */}
        <Box sx={itemStyle}>
          <TextField
            label="REFERENCIA"
            value={tarjetaData.referencia}
            onChange={(e) => handleInputChange('referencia', e.target.value)}
            {...textFieldProps}
          />
        </Box>
      </Box>
    </Paper>
  );
}