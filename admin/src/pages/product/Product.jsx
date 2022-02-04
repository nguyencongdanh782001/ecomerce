import { Publish } from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress, Slide, Snackbar } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as api from '../../api/orderApi';
import Chart from "../../components/chart/Chart";
import { getProductDetail, updateProduct } from "../../redux/productRedux";
import "./product.css";
export default function Product() {
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const { productDetail, isLoadingUpdate } = useSelector(state => state.product)

    const [pStats, setPStats] = useState([])
    const [pName, setPName] = useState('')
    const [pDesc, setPDesc] = useState('')
    const [pCategories, setPCategories] = useState('')
    const [pColor, setPColor] = useState('')
    const [pSize, setPSize] = useState('')
    const [pPrice, setPPrice] = useState(0)
    const [pInStock, setPInStock] = useState()
    const [pImg, setPImg] = useState(null)

    const MONTHS = useMemo(() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ], [])

    useEffect(() => {
        const getStats = async (id) => {
            try {
                const res = await api.getIncomeOrder(id)
                res.data.map(item => {
                    return setPStats((prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }])
                })
            } catch (error) {

            }
        }
        getStats(id)
    }, [pStats, MONTHS, id])

    useEffect(() => {
        const getProduct = async (id) => {
            try {
                const res = await dispatch(getProductDetail(id))
                await setPName(res.payload.title)
                await setPDesc(res.payload.desc)
                await setPCategories(res.payload.categories.join(', '))
                await setPSize(res.payload.size.join(', '))
                await setPColor(res.payload.color.join(', '))
                await setPPrice(res.payload.price)
                await setPInStock(res.payload.inStock)
            } catch (error) {

            }
        }
        getProduct(id)
    }, [dispatch, id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', pImg)
        formData.append('title', pName)
        pCategories.split(',').map((item) => formData.append('categories', item))
        pSize.split(',').map((item) => formData.append('size', item))
        pColor.split(',').map((item) => formData.append('color', item))
        formData.append('desc', pDesc)
        formData.append('price', pPrice)
        formData.append('inStock', pInStock)

        try {
            const res = await dispatch(updateProduct({ id: id, data: formData }))
            if (res.meta.requestStatus === 'fulfilled') {
                setOpen(true)
                setTransition(() => TransitionLeft)
                setNotify({ isValid: false, message: 'Product update successful' })
            } else if (res.meta.requestStatus === 'rejected') {
                setOpen(true)
                setTransition(() => TransitionLeft)
                setNotify({ isValid: true, message: res.payload })
            }
        } catch (error) {

        }
    }
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const [notify, setNotify] = useState({
        isValid: false,
        message: ''
    })
    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="product">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoadingUpdate}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
                TransitionComponent={transition}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={transition ? transition.name : ''}
            >
                <Alert onClose={handleClose} severity={notify.isValid ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {notify.message}
                </Alert>
            </Snackbar>
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={productDetail?.img?.url} alt="" className="productInfoImg" />
                        <span className="productName">{productDetail?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">&nbsp;{productDetail?._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">$ {productDetail?.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{productDetail?.inStock ? 'yes' : 'no'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleUpdate}>
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input required type="text" value={pName || ''} placeholder={productDetail?.title} onChange={(e) => setPName(e.target.value)} />
                        <label>Product Description</label>
                        <textarea required type="text" value={pDesc || ''} onChange={(e) => setPDesc(e.target.value)} name="" id="" cols="78" rows="8" style={{ resize: 'none' }}></textarea>
                        <label style={{ marginTop: '10px' }}>Product Size</label>
                        <input required type="text" value={pSize || ''} placeholder={productDetail?.size.join(', ')} onChange={(e) => setPSize(e.target.value)} />
                        <label>Product Category</label>
                        <input required type="text" value={pCategories || ''} placeholder={productDetail?.categories.join(', ')} onChange={(e) => setPCategories(e.target.value)} />
                        <label>Product Color</label>
                        <input required type="text" value={pColor || ''} placeholder={productDetail?.color.join(', ')} onChange={(e) => setPColor(e.target.value)} />
                        <label>Price</label>
                        <input required type="text" value={pPrice || 0} placeholder={productDetail?.price} onChange={(e) => setPPrice(e.target.value)} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock" onChange={(e) => setPInStock(e.target.value)}>
                            <option value="true" defaultValue>Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={pImg ? URL.createObjectURL(pImg) : productDetail?.img?.url} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setPImg(e.target.files[0])} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div >
        </div >
    );
}
