import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../../requestMethod";
import { useState, useEffect } from "react";
import { updateProducts } from "../../redux/apiCalls";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract the product ID from the URL
  const [product, setProduct] = useState({}); // Use {} for an object instead of [] for an array
  const dispatch = useDispatch(); // Dispatch hook

  // Function to fetch product details
  const getProduct = async () => {
    try {
      const res = await userRequest.get(`/product/find/${id}`); // Make the API request
      console.log("API response:", res.data); // Log the response to check if data is coming correctly
      setProduct(res.data); // Set the product state with the response data
    } catch (err) {
      console.error("API error:", err); // Log any errors
    }
  };

  // Call getProduct when the component mounts or when the id changes
  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]); // Ensure the effect runs when the id changes

  console.log("Product:", product); // Log the product state

  const [inp, setInp] = useState({});
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    setInp((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const uploadFile = (file, label) => {
    return new Promise((resolve, reject) => {
      const fileName = `${new Date().getTime()}_${label}_${file.name}`;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${label} upload is ${progress}% done.`);
        },
        (error) => {
          console.error(`Error uploading ${label}:`, error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(`${label} file available at:`, url);
            resolve(url);
          });
        }
      );
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent form from refreshing
    try {
      const imgURL = await uploadFile(file, "img");
      setImg(imgURL);

      // After uploading the image, call the update function
      updateProducts(dispatch, { ...inp, categories: cat, img: imgURL ,id});
    } catch (err) {
      console.error("Error during update:", err);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product.img || "https://via.placeholder.com/150"}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product.title || "No Name"}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">colors:</span>
              <span className="productInfoValue">{product.color}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleUpload}>
          <div className="productFormLeft">
            <label htmlFor="fileInput">Product Image</label>
            <input
              type="file"
              name="img"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label>Product Name</label>
            <input
              type="text"
              placeholder="name"
              name="title"
              onChange={handleChange}
            />
            <label>Product Desc</label>
            <input
              type="text"
              placeholder="desc"
              name="desc"
              onChange={handleChange}
            />
            <label>Product Price</label>
            <input
              type="number"
              placeholder="price"
              name="price"
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label htmlFor="categoryInput">Category</label>
            <input
              type="text"
              placeholder="category"
              onChange={handleCat}
              id="categoryInput"
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={img || "https://via.placeholder.com/150"}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
