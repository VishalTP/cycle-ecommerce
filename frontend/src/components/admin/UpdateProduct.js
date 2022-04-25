import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearError, updateProduct, getProductDetails } from "../../actions/productAction"
import SideBar from "./Sidebar"
import { productActionType } from "../../actionTypes/productActionType"
import { useNavigate, useParams } from "react-router"

const UpdateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, product } = useSelector((state) => state.productDetails)

  const { loading, error: updateError, isUpdated } = useSelector((state) => state.updateProduct)

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [oldImages, setOldImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = [
    "road",
    "hybrid",
    "mtb",
    "fatbike",
    "tt",
    "gravel",
    "touring",
    "kids",
    "accessories"
  ];

  const {id} = useParams()

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id))
    } else {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setStock(product.stock)
      setOldImages(product.images)
    }
    if (error) {
    //   alert - error
      dispatch(clearError())
    }

    if (updateError) {
    //   alert - error
      dispatch(clearError())
    }

    if (isUpdated) {
    //   alert - Product Updated Successfully
        dispatch({ type: productActionType.UPDATE_PRODUCT_RESET });
      navigate("/admin/products")
    }
  }, [dispatch, error,isUpdated, id, product, updateError ])

  const updateProductSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("price", price)
    myForm.set("description", description)
    myForm.set("category", category)
    myForm.set("stock", stock)

    images.forEach((image) => {
      myForm.append("images", image)
    })
    dispatch(updateProduct(id, myForm))
  }

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <div className="dashboard">
        <SideBar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct