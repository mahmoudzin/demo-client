import axios from "axios";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { base_img_rul, base_url } from "../../api/config";
import { Link } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import LoadingButton from "@mui/lab/LoadingButton";
import TuneIcon from "@mui/icons-material/Tune";
const RES_FIELDS = "title,description,price,main_image,stock";
const LIMIT = 9;

export default function Home() {
  const [categories, setCategories] = useState(null);
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  const [searchBy, setSearchBy] = useState("title");

  const pagesNumber = useRef(0);

  //next page
  const nextPage = () => {
    if (currentPage < pagesNumber.current) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  //prev page
  const previousPage = () => {
    if (currentPage > 1) setCurrentPage((prevState) => prevState - 1);
  };

  //filters submit
  const filterSubmit = async (e) => {
    console.log({
      searchQuery,
      searchBy,
    });

    e.preventDefault();
    setIsLoading(true);
    try {
      const cat_id = active === "all" ? "" : active;
      const search_field = searchQuery ? searchBy : "";
      const { data } = await axios.get(
        `${base_url}/products?cat_id=${cat_id}&fields=${RES_FIELDS}&limit=${LIMIT}&page=${currentPage}&search=${searchQuery}&search_field=${search_field}`
      );
      console.log("the async api:", data);
      pagesNumber.current = data.pages;
      setProducts(data.data);
    } catch (e) {
      console.log("proudct requset err:", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = useCallback(async () => {
    const { data } = await axios.get(`${base_url}/categories`);
    console.log(data);

    setCategories(data.data);
  }, []);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const cat_id = active === "all" ? "" : active;
      const search_field = searchQuery ? searchBy : "";
      const { data } = await axios.get(
        `${base_url}/products?cat_id=${cat_id}&fields=${RES_FIELDS}&limit=${LIMIT}&page=${currentPage}&search=${searchQuery}&search_field=${search_field}`
      );
      console.log("the async api:", data);
      pagesNumber.current = data.pages;
      setProducts(data.data);
    } catch (e) {
      console.log("proudct requset err:", e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [active, currentPage]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="my-5 container mx-auto">
      <FilterBar
        {...{
          searchQuery,
          setSearchQuery,
          searchBy,
          setSearchBy,
          filterSubmit,
        }}
      />
      <div className="flex gap-2">
        <Categories {...{ categories, active, setActive }} />
        {!isLoading ? (
          <div className="lg:w-3/4">
            <Products {...{ products }} />
            {pagesNumber.current && (
              <PaginationBar
                {...{
                  currentPage,
                  pages: pagesNumber.current,
                  nextPage,
                  previousPage,
                }}
              />
            )}
          </div>
        ) : (
          <>loading...</>
        )}
      </div>
      {/* Categories */}
      {/* Proudcts */}
      {/* filters */}
    </div>
  );
}

const Categories = memo(({ categories, active, setActive }) => {
  return (
    <div className="lg:w-1/4 shadow bg-white rounded-md">
      <h2 className="my-4 px-4">Categories</h2>

      <ul className="space-y-1 p-2">
        <li
          className={`block text-nowrap rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100  hover:text-gray-700 ${
            active === "all" && "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActive("all")}
        >
          All
        </li>
        {categories ? (
          categories.map((category) => {
            return (
              <li
                key={category._id}
                onClick={() => setActive(category._id)}
                className={`block text-nowrap rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100  hover:text-gray-700 ${
                  active === category._id && "bg-gray-100 text-gray-700"
                }`}
              >
                {category.title}
              </li>
            );
          })
        ) : (
          <>loading...</>
        )}
      </ul>
    </div>
  );
});

const Products = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {products?.map((product) => (
        <Link
          key={product._id}
          to={"/"}
          className="group relative block overflow-hidden w-1/3"
        >
          <div className="px-3 mb-2">
            <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span className="sr-only">Wishlist</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <img
              src={`${base_img_rul}${product.main_image}`}
              alt=""
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {product.title}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">
                {product.description}
              </p>
              <p className="mt-1.5 text-sm text-gray-700">
                ${!isNaN(Number(product.price)) && product.price}
              </p>

              <form className="mt-4">
                <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                  Add to Cart
                </button>
              </form>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const PaginationBar = ({ currentPage, pages, nextPage, previousPage }) => {
  return (
    <div className="w-100 flex justify-center">
      <div className="inline-flex items-center justify-center gap-3">
        <button
          onClick={previousPage}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-xs text-gray-900">
          {currentPage}
          <span className="mx-0.25">/</span>
          {pages}
        </p>

        <button
          onClick={nextPage}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const FilterBar = ({
  searchBy,
  setSearchBy,
  searchQuery,
  setSearchQuery,
  filterSubmit,
}) => {
  return (
    <Stack
      onSubmit={filterSubmit}
      component={"form"}
      direction={"row"}
      gap={1}
      alignItems={"center"}
      className="mb-10 p-2 rounded-md border border-1 border-gray-300"
    >
      {/* search */}
      <SearchFiled {...{ searchQuery, setSearchQuery }} />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="search-by">Search By</InputLabel>
          <Select
            labelId="search-by"
            id="search-by-fields"
            value={searchBy}
            label="Search By"
            onChange={(e) => {
              setSearchBy(e.target.value);
              console.log(e.target.value);
            }}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"price"}>Price</MenuItem>
            <MenuItem value={"stock"}>Stock</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* price */}
      {/* stock */}
      {/* sort_field */}
      {/* sort_order */}
      <LoadingButton
        loading={false}
        loadingPosition={"start"}
        startIcon={<TuneIcon />}
        type="submit"
        variant="outlined"
      >
        Apply
      </LoadingButton>
    </Stack>
  );
};

const SearchFiled = ({ searchQuery, setSearchQuery }) => {
  return (
    <Paper
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 200,
        height: 55,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
};
