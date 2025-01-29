import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


export default function ProductList() {
  const dispatch = useDispatch(); 
  const products = useSelector((state) => state.product.products);




  useEffect(() => {
 getProducts(dispatch); // Dispatch the action to fetch products
  }, [dispatch]);


  console.log("products",products);

  const handleDelete = (id) => {
    // Add delete logic if necessary
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "categories",
      headerName: "Categories",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products} // Pass the product data from Redux to the DataGrid
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id} // Use _id as the unique identifier
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
