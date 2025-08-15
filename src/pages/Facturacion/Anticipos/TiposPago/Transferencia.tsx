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
    Chip,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

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

    // Bancos de la clínica (para destino)
    const bancosClinica = [
        'BANCO PICHINCHA - CTA CORRIENTE 2100123456 - CLINICA SAINT',
        'BANCO DEL PACIFICO - CTA AHORROS 4200987654 - CLINICA SAINT',
        'PRODUBANCO - CTA CORRIENTE 1500567890 - CLINICA SAINT MEDICA',
        'BANCO DE GUAYAQUIL - CTA AHORROS 3400112233 - CLINICA SAINT',
        'BANCO BOLIVARIANO - CTA CORRIENTE 5600445566 - CLINICA SAINT LTDA',
        'BANCO INTERNACIONAL - CTA AHORROS 7800998877 - CLINICA SAINT',
        'BANCO MACHALA - CTA CORRIENTE 9900123456 - CLINICA SAINT MEDICA',
    ];

    // Lista de bancos (para origen)
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
        'BANCO MACHALA',
        'BANCO PROCREDIT',
        'BANCO CAPITAL',
        'BANCO DINERS CLUB',
        'COOPERATIVA JUVENTUD ECUATORIANA',
        'MUTUALISTA PICHINCHA',
        'BANCO AMAZONAS',
        'BANCO COMERCIAL DE MANABI',
        'BANCO FINCA',
        'BANCO VisionFund',
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

    const validarDatos = () => {
        if (!transferenciaData.bancoDestino) {
            setErrorMessage('Debe seleccionar el banco de destino');
            return false;
        }

        if (!transferenciaData.valor || transferenciaData.valor.trim() === '') {
            setErrorMessage('El valor es obligatorio');
            return false;
        }

        // Validar que el valor contenga al menos un número
        const contieneNumero = /\d/.test(transferenciaData.valor);
        if (!contieneNumero) {
            setErrorMessage('El valor debe contener al menos un número');
            return false;
        }

        if (!transferenciaData.bancoProveniente) {
            setErrorMessage('Debe seleccionar el banco proveniente');
            return false;
        }

        if (!transferenciaData.numeroComprobante || transferenciaData.numeroComprobante.trim() === '') {
            setErrorMessage('El número de comprobante es obligatorio');
            return false;
        }

        // Validar que el número de comprobante sea numérico
        const esNumerico = /^\d+$/.test(transferenciaData.numeroComprobante);
        if (!esNumerico) {
            setErrorMessage('El número de comprobante debe contener solo números');
            return false;
        }

        // Validar número de factura si está presente
        if (transferenciaData.numeroFactura && transferenciaData.numeroFactura.trim() !== '') {
            const facturaEsNumerica = /^\d+$/.test(transferenciaData.numeroFactura);
            if (!facturaEsNumerica) {
                setErrorMessage('El número de factura debe contener solo números');
                return false;
            }
        }

        return true;
    };

    const handleRegistrar = () => {
        if (!validarDatos()) {
            return;
        }

        console.log('Transferencia registrada:', transferenciaData);
        setSuccessMessage(`Transferencia por ${transferenciaData.valor} registrada correctamente`);

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleCerrar = () => {
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

    // Extraer información del banco destino seleccionado
    const getBancoDestinoInfo = (bancoCompleto: string) => {
        if (!bancoCompleto) return null;

        const partes = bancoCompleto.split(' - ');
        return {
            banco: partes[0] || '',
            cuenta: partes[1] || '',
            titular: partes[2] || '',
        };
    };

    const infoDestino = getBancoDestinoInfo(transferenciaData.bancoDestino);

    return (
        <Box sx={{ p: 3 }}>
            <Typography
                variant="h6"
                sx={{
                    color: '#1A3C6D',
                    fontWeight: 'bold',
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                <SwapHorizIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
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

            <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {/* Columna Izquierda */}
                    <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                        {/* Banco Destino */}
                        <Box sx={{ mb: 3 }}>
                            <FormControl {...selectProps}>
                                <InputLabel sx={{ fontWeight: 'bold' }}>BANCO DESTINO *</InputLabel>
                                <Select
                                    label="BANCO DESTINO *"
                                    value={transferenciaData.bancoDestino}
                                    onChange={(e) => handleInputChange('bancoDestino', e.target.value)}
                                    {...selectProps}
                                    startAdornment={<AccountBalanceIcon sx={{ mr: 1, fontSize: 16, color: '#2196F3' }} />}
                                >
                                    {bancosClinica.map((banco) => (
                                        <MenuItem key={banco} value={banco}>
                                            {banco}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {infoDestino && (
                                <Box sx={{ mt: 1 }}>
                                    <Chip label={infoDestino.banco} size="small" color="primary" variant="outlined" />
                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#666' }}>
                                        {infoDestino.cuenta} - {infoDestino.titular}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Valor */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="VALOR *"
                                value={transferenciaData.valor}
                                onChange={(e) => handleInputChange('valor', e.target.value)}
                                {...textFieldProps}
                                placeholder="Ej: $150.50 o 150.50"
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <PaymentIcon sx={{ mr: 1, fontSize: 16, color: '#4CAF50' }} />,
                                    style: {
                                        ...textFieldProps.InputProps.style,
                                        backgroundColor: '#F0F8FF',
                                        fontWeight: 'bold',
                                    }
                                }}
                                helperText="Campo alfanumérico - puede incluir símbolos"
                            />
                        </Box>

                        {/* Banco Proveniente */}
                        <Box sx={{ mb: 3 }}>
                            <FormControl {...selectProps}>
                                <InputLabel sx={{ fontWeight: 'bold' }}>BANCO PROVENIENTE *</InputLabel>
                                <Select
                                    label="BANCO PROVENIENTE *"
                                    value={transferenciaData.bancoProveniente}
                                    onChange={(e) => handleInputChange('bancoProveniente', e.target.value)}
                                    {...selectProps}
                                    startAdornment={<AccountBalanceIcon sx={{ mr: 1, fontSize: 16, color: '#FF9800' }} />}
                                >
                                    {bancosProvenientes.map((banco) => (
                                        <MenuItem key={banco} value={banco}>
                                            {banco}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Columna Derecha */}
                    <Box sx={{ flex: '1 1 45%', minWidth: '300px' }}>
                        {/* Nombre de Cuenta */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="NOMBRE DE CUENTA"
                                value={transferenciaData.nombreCuenta}
                                onChange={(e) => handleInputChange('nombreCuenta', e.target.value)}
                                {...textFieldProps}
                                placeholder="Nombre del titular (opcional)"
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <PersonIcon sx={{ mr: 1, fontSize: 16, color: '#9C27B0' }} />,
                                }}
                                helperText="Campo opcional"
                            />
                        </Box>

                        {/* Número de Comprobante */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="NÚMERO DE COMPROBANTE *"
                                value={transferenciaData.numeroComprobante}
                                onChange={(e) => handleInputChange('numeroComprobante', e.target.value)}
                                {...textFieldProps}
                                placeholder="123456789"
                                type="number"
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <ReceiptIcon sx={{ mr: 1, fontSize: 16, color: '#E91E63' }} />,
                                }}
                                helperText="Solo números"
                            />
                        </Box>

                        {/* Número de Factura */}
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                label="N° FACTURA"
                                value={transferenciaData.numeroFactura}
                                onChange={(e) => handleInputChange('numeroFactura', e.target.value)}
                                {...textFieldProps}
                                placeholder="001-001-000000123"
                                type="number"
                                InputProps={{
                                    ...textFieldProps.InputProps,
                                    startAdornment: <ReceiptIcon sx={{ mr: 1, fontSize: 16, color: '#607D8B' }} />,
                                }}
                                helperText="Campo opcional - solo números"
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Resumen de la Transferencia */}
                {transferenciaData.bancoDestino && transferenciaData.bancoProveniente && transferenciaData.valor && (
                    <Paper elevation={1} sx={{ p: 2, mt: 3, backgroundColor: '#F5F5F5' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            RESUMEN DE LA TRANSFERENCIA:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                                    ORIGEN:
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                    • Banco: {transferenciaData.bancoProveniente}
                                </Typography>
                                {transferenciaData.nombreCuenta && (
                                    <Typography variant="caption" sx={{ display: 'block' }}>
                                        • Titular: {transferenciaData.nombreCuenta}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ flex: '1 1 45%' }}>
                                <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                                    DESTINO:
                                </Typography>
                                {infoDestino && (
                                    <>
                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                            • Banco: {infoDestino.banco}
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                            • Cuenta: {infoDestino.cuenta}
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                            • Titular: {infoDestino.titular}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #ddd' }}>
                            <Typography variant="caption" sx={{ display: 'block', color: 'green', fontWeight: 'bold' }}>
                                • Valor: {transferenciaData.valor}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                                • Comprobante: {transferenciaData.numeroComprobante}
                            </Typography>
                            {transferenciaData.numeroFactura && (
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                    • N° Factura: {transferenciaData.numeroFactura}
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                )}

                {/* Botones */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegistrar}
                        sx={{
                            fontWeight: 'bold',
                            minWidth: 120,
                            backgroundColor: '#1A3C6D',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#16345C',
                            }
                        }}
                        startIcon={<SwapHorizIcon />}
                    >
                        REGISTRAR
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCerrar}
                        sx={{
                            fontWeight: 'bold',
                            minWidth: 120,
                            backgroundColor: '#1A3C6D',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#16345C',
                            }
                        }}
                    >
                        CERRAR
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}