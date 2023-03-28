import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Carousel } from "react-bootstrap";

import {
  getAdminProducts,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";

import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = () => {
  const dispatch = useDispatch();

  const notify = (message = "") =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  let navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      notify(error);

      dispatch(clearErrors());
    }

    if (deleteError) {
      notify(deleteError);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      notify("Product deleted successfully");

      navigate("/admin/products");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "Name",

          field: "name",

          sort: "asc",
        },

        {
          label: "Price",

          field: "price",

          sort: "asc",
        },

        {
          label: "Stock",

          field: "stock",

          sort: "asc",
        },

        {
          label: "Image",

          field: "image",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,

        name: product.name,

        price: `$${product.price}`,

        stock: product.stock,

        image: (
          <Fragment>
            <Carousel pause="hover">
              {product.images &&
                product.images.map((image) => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={product.title}
                      width="10px"
                      height={"100px"}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Fragment>
        ),

        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
