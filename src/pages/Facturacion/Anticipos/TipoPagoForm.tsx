import React, { useState, useEffect } from 'react';
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
    Chip,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PercentIcon from '@mui/icons-material/Percent';

interface TipoPagoData {
    total: number;
    efectivo: number;
    retencionFuente: number;
    porcentajeRetencionFuente: number;
    retencionIVA: number;
    comision: number;
}

export default function TipoPagoForm() {
    const [tipoPagoData, setTipoPagoData] = useState<TipoPagoData>({
        total: 0,
        efectivo: 0,
        retencionFuente: 0,
        porcentajeRetencionFuente: 3, // Porcentaje por defecto
        retencionIVA: 0,
        comision: 0,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [diferencia, setDiferencia] = useState<number>(0);

    // Porcentajes disponibles para retención en la fuente
    const porcentajesRetencion = [1, 2, 3, 5, 8, 10, 15];

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

    // Calcular retención en la fuente automáticamente cuando cambie el total o porcentaje
    useEffect(() => {
        if (tipoPagoData.total > 0 && tipoPagoData.porcentajeRetencionFuente > 0) {
            const retencionCalculada = (tipoPagoData.total * tipoPagoData.porcentajeRetencionFuente) / 100;
            setTipoPagoData(prev => ({
                ...prev,
                retencionFuente: Math.round(retencionCalculada * 100) / 100 // Redondear a 2 decimales
            }));
        }
    }, [tipoPagoData.total, tipoPagoData.porcentajeRetencionFuente]);

    // Calcular diferencia automáticamente
    useEffect(() => {
        const totalPagos = tipoPagoData.efectivo + tipoPagoData.retencionFuente +
            tipoPagoData.retencionIVA + tipoPagoData.comision;
        const diferenciaPago = tipoPagoData.total - totalPagos;
        setDiferencia(Math.round(diferenciaPago * 100) / 100);
    }, [tipoPagoData]);

    const handleInputChange = (field: keyof TipoPagoData, value: string | number) => {
        let numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;

        setTipoPagoData(prev => ({
            ...prev,
            [field]: numericValue
        }));

        // Limpiar mensajes cuando el usuario empiece a escribir
        if (errorMessage || successMessage) {
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    const validarDatos = () => {
        if (tipoPagoData.total <= 0) {
            setErrorMessage('El total debe ser mayor a 0');
            return false;
        }

        const totalPagos = tipoPagoData.efectivo + tipoPagoData.retencionFuente +
            tipoPagoData.retencionIVA + tipoPagoData.comision;

        if (totalPagos > tipoPagoData.total) {
            setErrorMessage('La suma de los pagos no puede ser mayor al total');
            return false;
        }

        if (Math.abs(diferencia) > 0.01) {
            setErrorMessage(`Existe una diferencia de $${diferencia.toFixed(2)}. Verifique los montos ingresados.`);
            return false;
        }

        return true;
    };

    const handleRegistrar = () => {
        if (!validarDatos()) {
            return;
        }

        console.log('Tipo de pago registrado:', tipoPagoData);
        setSuccessMessage('Tipo de pago registrado correctamente');

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleLimpiar = () => {
        setTipoPagoData({
            total: 0,
            efectivo: 0,
            retencionFuente: 0,
            porcentajeRetencionFuente: 3,
            retencionIVA: 0,
            comision: 0,
        });
        setErrorMessage('');
        setSuccessMessage('');
        setDiferencia(0);
    };

    const getDiferenciaColor = (valor: number) => {
        if (Math.abs(valor) < 0.01) return 'success';
        if (valor > 0) return 'warning';
        return 'error';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "#1A3C6D",
                        textAlign: "left",
                    }}
                >
                    FORMAS DE PAGO
                </Typography>
            </Box>

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

            <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {/* Columna Izquierda */}
                    <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                        {/* Total */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="TOTAL"
                                type="number"
                                value={tipoPagoData.total || ''}
                                onChange={(e) => handleInputChange('total', e.target.value)}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <AttachMoneyIcon sx={{ mr: 1, fontSize: 16, color: '#666' }} />,
                                    style: {
                                        ...textFieldProps.InputProps.style,
                                        backgroundColor: '#F0F8FF',
                                        fontWeight: 'bold',
                                    }
                                }}
                                helperText="Monto total a pagar"
                            />
                        </Box>

                        {/* Efectivo */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="EFECTIVO"
                                type="number"
                                value={tipoPagoData.efectivo || ''}
                                onChange={(e) => handleInputChange('efectivo', e.target.value)}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <AttachMoneyIcon sx={{ mr: 1, fontSize: 16, color: '#4CAF50' }} />,
                                }}
                                helperText="Pago en efectivo"
                            />
                        </Box>

                        {/* Retención IVA */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="RETENCIÓN IVA"
                                type="number"
                                value={tipoPagoData.retencionIVA || ''}
                                onChange={(e) => handleInputChange('retencionIVA', e.target.value)}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <ReceiptIcon sx={{ mr: 1, fontSize: 16, color: '#FF9800' }} />,
                                }}
                                helperText="Retención de IVA"
                            />
                        </Box>
                    </Box>

                    {/* Columna Derecha */}
                    <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                        {/* Retención en la Fuente */}
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Box sx={{ flex: '2' }}>
                                    <TextField
                                        label="RETENCIÓN FUENTE"
                                        type="number"
                                        value={tipoPagoData.retencionFuente || ''}
                                        onChange={(e) => handleInputChange('retencionFuente', e.target.value)}
                                        {...textFieldProps}
                                        InputProps={{
                                            ...textFieldProps.InputProps,
                                            startAdornment: <PercentIcon sx={{ mr: 1, fontSize: 16, color: '#9C27B0' }} />,
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: '1' }}>
                                    <FormControl {...selectProps}>
                                        <InputLabel sx={{ fontWeight: 'bold' }}>%</InputLabel>
                                        <Select
                                            label="%"
                                            value={tipoPagoData.porcentajeRetencionFuente}
                                            onChange={(e) => handleInputChange('porcentajeRetencionFuente', e.target.value as number)}
                                            {...selectProps}
                                        >
                                            {porcentajesRetencion.map((porcentaje) => (
                                                <MenuItem key={porcentaje} value={porcentaje}>
                                                    {porcentaje}%
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: 10 }}>
                                Retención automática: {tipoPagoData.porcentajeRetencionFuente}% de ${tipoPagoData.total}
                            </Typography>
                        </Box>

                        {/* Comisión */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="COMISIÓN"
                                type="number"
                                value={tipoPagoData.comision || ''}
                                onChange={(e) => handleInputChange('comision', e.target.value)}
                                {...textFieldProps}
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <AttachMoneyIcon sx={{ mr: 1, fontSize: 16, color: '#2196F3' }} />,
                                }}
                                helperText="Comisión aplicada"
                            />
                        </Box>

                        {/* Indicador de Diferencia */}
                        <Box sx={{ mb: 3 }}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    backgroundColor: diferencia === 0 ? '#E8F5E8' : diferencia > 0 ? '#FFF3E0' : '#FFEBEE',
                                    border: `2px solid ${diferencia === 0 ? '#4CAF50' : diferencia > 0 ? '#FF9800' : '#F44336'}`
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    RESUMEN:
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                    Total: ${tipoPagoData.total.toFixed(2)}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                    Suma Pagos: ${(tipoPagoData.efectivo + tipoPagoData.retencionFuente + tipoPagoData.retencionIVA + tipoPagoData.comision).toFixed(2)}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Chip
                                        label={`Diferencia: $${diferencia.toFixed(2)}`}
                                        color={getDiferenciaColor(diferencia)}
                                        size="small"
                                        variant="filled"
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Box>

                {/* Botones */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={handleLimpiar}
                        sx={{ backgroundColor: "#1A3C6D", color: "#fff", fontWeight: 'bold', minWidth: 120 }}
                    >
                        LIMPIAR
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}