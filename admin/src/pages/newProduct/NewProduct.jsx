import { useState } from "react";
import "./newProduct.css";
import { InsertProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewProduct() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [inp, setInp] = useState({});
  const dispatch = useDispatch();
  console.log(img)

  const handleChange = (e) => {
    setInp((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
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
      InsertProducts(dispatch, {
        ...inp,
        categories: cat,
        img: imgURL,
        size: size,
        color: color,
      });
    } catch (err) {
      console.error("Error during update:", err);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleUpload}>
        <div className="addProductItem">
          <label>Product Image</label>
          <input
            type="file"
            name="img"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Product Name</label>
          <input
            type="text"
            name="title"
            placeholder="Apple Airpods"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input
            type="text"
            name="desc"
            placeholder="123"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Product Price</label>
          <input
            type="number"
            placeholder="price"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="active" onChange={handleChange} required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label htmlFor="categoryInput">Category</label>
          <input
            type="text"
            placeholder="category"
            onChange={handleCat}
            id="categoryInput"
            required
          />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input
            type="text"
            placeholder="size"
            onChange={handleSize}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="color"
            onChange={handleColor}
            required
          />
        </div>
        <button className="addProductButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
