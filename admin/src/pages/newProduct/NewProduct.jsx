import ClearIcon from '@mui/icons-material/Clear';
import { Alert, Backdrop, CircularProgress, Slide, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/productRedux";
import "./newProduct.css";

export default function NewProduct() {
  const { isLoadingCreate } = useSelector(state => state.product)
  const disptach = useDispatch()
  const [pImage, setPImage] = useState(null)
  const [pTitle, setPTitle] = useState('')
  const [pCat, setPCat] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [pSize, setPSize] = useState('')
  const [pColor, setPColor] = useState('')
  const [pPrice, setPPrice] = useState(0)

  const handleCreate = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', pImage)
    formData.append('title', pTitle)
    formData.append('desc', pDesc)
    pCat.split(',').map((item) => (formData.append('categories', item)))
    pSize.split(',').map((item) => (formData.append('size', item)))
    pColor.split(',').map((item) => (formData.append('color', item)))
    formData.append('price', pPrice)
    try {
      const res = await disptach(createProduct(formData))
      if (res.meta.requestStatus === 'fulfilled') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: false, message: 'Product create successful' })
      } else if (res.meta.requestStatus === 'rejected') {
        setOpen(true)
        setTransition(() => TransitionLeft)
        setNotify({ isValid: true, message: 'Product create failed' })
      }
    } catch (error) {

    }
  }

  const handleDeleteImg = () => {
    setPImage(null)
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
    <div className="newProduct">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingCreate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key={transition ? transition.name : ''}
      >
        <Alert onClose={handleClose} severity={notify.isValid ? 'error' : 'success'} sx={{ width: '100%' }}>
          {notify.message}
        </Alert>
      </Snackbar>
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleCreate}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" accept="image/*" onChange={(e) => setPImage(e.target.files[0])} />
        </div>
        {
          pImage &&
          (
            <div className="displayImg">
              <img src={window.URL.createObjectURL(pImage)} alt="" />
              <ClearIcon className="iconImg" onClick={handleDeleteImg} />
            </div>
          )
        }

        <div className="addProductItem">
          <label>Name Product</label>
          <input required type="text" placeholder="Name Product" value={pTitle} onChange={(e) => setPTitle(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea placeholder="Description" name="" id="" cols="30" rows="10" value={pDesc} onChange={(e) => setPDesc(e.target.value)}></textarea>
        </div>
        <div className="addProductItem">
          <label>categories</label>
          <input required type="text" placeholder="Category1, Category2, ..." value={pCat} onChange={(e) => setPCat(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input required type="text" placeholder="Size1, Size2, ..." value={pSize} onChange={(e) => setPSize(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input required type="text" placeholder="Color1, Color2, ..." value={pColor} onChange={(e) => setPColor(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input required type="number" placeholder="Price" value={pPrice} onChange={(e) => setPPrice(e.target.value)} />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
