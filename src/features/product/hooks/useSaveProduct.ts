'use client'
import * as yup from 'yup';
import { useProductStore } from '../infraestructure/stores/product.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FloatMessageType } from '@/shared/ui/types/FloatMessageType';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { registerInitialProductAction } from '../actions/register-initial-product.action';
import { RegisterInitialProductDTO } from '../application/dtos/register-initial-product.dto';
import { LocationEnum } from '@/features/inventory/domain/enums/location.enum';
import { useWorkspace } from '@/shared/hooks/useAuth';
import { ForSaleEnum } from '../domain/enums/for-sale.enum';

const schema = yup.object({
    //Product
    // sku: yup.string().optional().notRequired(),
    name: yup.string().required('El nombre del producto es obligatorio.').min(3, 'El nombre del producto debe tener al menos 3 caracteres.'),
    description: yup.string().optional().notRequired().default(''),
    categoryId: yup.string()
        .required('Debes elegir la categoría del producto.')
        .test('not-empty', 'Debes elegir la categoría del producto.', value => value !== undefined && value !== null && value !== ''),
    brandId: yup.string()
        .required('Debes elegir la marca del producto.')
        .test('not-empty', 'Debes elegir la marca del producto.', value => value !== undefined && value !== null && value !== ''),
    seasonId: yup.string()
        .required('Debes elegir la temporada en la que se vende el producto.')
        .test('not-empty', 'Debes elegir la temporada en la que se vende el producto.', value => value !== undefined && value !== null && value !== ''),
    universalBarCode: yup.string().required('El codigo de barra universal es obligatorio.'),
    unitOfMeasure: yup.string().required('La unidad de medida por defecto para venta es obligatoria'),
    purchaseUnit: yup.string().required('La unidad de medida de compra es obligatoria'),
    minStockGlobal: yup.number().required('El stock minimo por establecimeinto es obligatorio.').typeError('Asegurate de ingresar la información correcta.'),
    imageUrl: yup.string().notRequired().optional().nullable(),
    // Lot
    lotNumber: yup.string().default(`LOT-${new Date().getTime()}`),
    purchasePrice: yup.number().positive('El precio debe ser un número positivo').required('El precio de compra es requerido.').typeError('Asegurate de ingresar la información correcta.'),
    initialQuantity: yup.number().positive('La cantidad de producto inicial es obligatoria.').typeError('Asegurate de ingresar la información correcta.'),
    expirationDate: yup.date()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .optional().notRequired().nullable(),
    manufacturingDate: yup.date()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .optional().notRequired().nullable(),
    receivedDate: yup.date()
        .required('La fecha de entrada del producto es requerida.')
        .transform((value, originalValue) => originalValue === '' ? null : value),
    // Inventory
    location: yup.string().required('La ubicacion del producto es obligatorio.'),
    // quantityOnHan: yup.number().required('El stock para la ubicación asignada es obligatorio.').positive('La cantidad debe ser positiva.').typeError('Asegurate de ingresar la información correcta.'),
    lastStockedAt: yup.date().required().default(() => new Date()),
    isSellable: yup.boolean(),
    purchasePriceAtStock: yup.number().typeError('Asegurate de ingresar la información correcta.'),
    internalBarCode: yup.string().required('El codigo de barra interno es obligatorio.').typeError('Asegurate de ingresar la información correcta.'),
    salePriceOne: yup.number().required('El precio de venta por menudeo es obligatorio.').typeError('Asegurate de ingresar la información correcta.'),
    salePriceMany: yup.number().required('El precio de venta por mayoreo es obligatorio.').typeError('Asegurate de ingresar la información correcta.'),
    saleQuantityMany: yup.number().required('La cantidad de producto por mayoreo es obligatorio.').positive('El número debe ser positivo.').typeError('Asegurate de ingresar la información correcta.'),
    salePriceSpecial: yup.number().required('El precio de venta especial es obligatorio.').positive('El número debe ser positivo.').typeError('Asegurate de ingresar la información correcta.'),
    minStockBranch: yup.number().required('El stock mínimo por sucursal es obligatorio.').positive('El número debe ser positivo.').typeError('Asegurate de ingresar la información correcta.'),
    maxStockBranch: yup.number().optional().notRequired().default(0).positive('El numero debe ser positivo').typeError('Asegurate de ingresar la información correcta.')
}).required();

type FormData = yup.InferType<typeof schema>;

interface Props {
}

const useSaveProduct = () => {
    const [floatMessageState, setFloatMessageState] = useState<FloatMessageType>({});
    const [isLoading, setIsLoading] = useState(false);
    const { product, setProduct } = useProductStore();
    const { establishment, branchOffice } = useWorkspace();

    const { register, handleSubmit, reset, setValue, watch, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            expirationDate: new Date(),
            manufacturingDate: new Date()
        }
    });

    useEffect(() => {
        reset({
            // sku: uuidv4(),
            lotNumber: new Date().getDate().toString(),
            lastStockedAt: new Date(),
        });
    }, [reset]);

    const [lotUnitPurchases, setLotUnitPurchases] = useState([
        { purchasePrice: "", purchaseQuantity: "", unit: "" },
    ]);

    const addLotUnitPurchase = () => {
        setLotUnitPurchases([
            ...lotUnitPurchases,
            { purchasePrice: "", purchaseQuantity: "", unit: "" },
        ]);
    };

    const removeLotUnitPurchase = (index: number) => {
        setLotUnitPurchases(lotUnitPurchases.filter((_, i) => i !== index));
    };

    const updateLotUnitPurchase = (index: number, field: string, value: string) => {
        const updated = [...lotUnitPurchases];
        updated[index] = { ...updated[index], [field]: value };
        setLotUnitPurchases(updated);
    };

    const universalBarCode = watch('universalBarCode');
    const handleBarCodeMatch = () => {
        setValue('internalBarCode', universalBarCode || '');
    }

    const resetFormProduct = () => {
        setProduct(null);
        reset({});
        clearErrors(['brandId', 'categoryId', 'seasonId', 'brandId', 'unitOfMeasure', 'minStockGlobal',
            'universalBarCode', 'imageUrl', 'name', 'description', 'purchasePrice', 'receivedDate',
            'location', 'internalBarCode', 'salePriceOne', 'salePriceMany', 'salePriceSpecial',
            'saleQuantityMany', 'minStockBranch', 'maxStockBranch']);
    }

    const onSubmit = async (data: FormData) => {
        setFloatMessageState(() => ({}));
        setIsLoading(true);

        let productResult;

        const newProduct: RegisterInitialProductDTO = {
            establishmentId: establishment?.establishmentId || '0',
            categoryId: data.categoryId,
            brandId: data.brandId,
            seasonId: data.seasonId,
            name: data.name,
            description: data.description,
            minStockGlobal: data.minStockGlobal,
            unitOfMeasure: data.unitOfMeasure,
            imageUrl: data.imageUrl,
            universalBarCode: data.universalBarCode,
            initialQuantity: data.initialQuantity ?? 0,
            purchaseUnit: data.purchaseUnit as unknown as ForSaleEnum,
            lotUnitPurchases: lotUnitPurchases.map(purchase => ({
                purchasePrice: parseFloat(purchase.purchasePrice),
                purchaseQuantity: parseFloat(purchase.purchaseQuantity),
                unit: purchase.unit as ForSaleEnum
            })),
            lotNumber: data.lotNumber,
            purchasePrice: data.purchasePrice,
            receivedDate: data.receivedDate,
            expirationDate: data.expirationDate,
            manufacturingDate: data.manufacturingDate,
            branchOfficeId: branchOffice?.branchOfficeId || '0',
            isSellable: data.isSellable ?? true,
            lastStockedAt: data.lastStockedAt,
            location: data.location as unknown as LocationEnum,
            purchasePriceAtStock: data.purchasePriceAtStock ?? 0,
            quantityOnHand: data.initialQuantity ?? 0,
            internalBarCode: data.internalBarCode,
            maxStockBranch: data.maxStockBranch,
            minStockBranch: data.minStockBranch,
            salePriceMany: data.salePriceMany,
            salePriceOne: data.salePriceOne,
            salePriceSpecial: data.salePriceSpecial,
            saleQuantityMany: data.saleQuantityMany,
        }
        console.log(newProduct)

        productResult = await registerInitialProductAction(newProduct);

        if (productResult.ok) {
            setIsLoading(false);
            resetFormProduct();
            setFloatMessageState(() => ({
                description: 'Producto registrado correctamente',
                summary: '¡Correcto!',
                isActive: true,
                type: 'green'
            }));
            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 4000);
        } else {
            setIsLoading(false);
            setFloatMessageState(() => ({
                description: productResult && productResult.error ? productResult.error.message : 'Ocurrió un error al registrar el producto.',
                summary: '¡Error!',
                isActive: true,
                type: 'red'
            }));
            setTimeout(() => {
                setFloatMessageState(() => ({}));
            }, 4000);
        }
    }
    return {
        product,
        setProduct,
        floatMessageState,
        setFloatMessageState,
        isLoading,
        setIsLoading,
        resetFormProduct,
        onSubmit,
        handleSubmit,
        register,
        errors,
        handleBarCodeMatch,
        updateLotUnitPurchase,
        removeLotUnitPurchase,
        addLotUnitPurchase,
        lotUnitPurchases
    }
}

export { useSaveProduct }
