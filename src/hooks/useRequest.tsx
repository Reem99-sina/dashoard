import React from "react";
import { Alert, Snackbar } from "@mui/material";
import axios, { AxiosResponse,AxiosError } from "axios";
import { useState } from "react";
// import {   } from "../data/api";
// import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../data/api";
// import { navigate } from "@storybook/addon-links";

const useRequest = ({
  path = null,
  method = null,
  successMessage=null,
  responseType = undefined,
  Token=null,
  contentType="application/json"
  // cont
}) => {
  //----useSelectors----
  // const states = useSelector((state) => state);
  // const userInfo = useSelector((state) => state.userInfo.value);
  let navigate = useNavigate();
  //  Token=localStorage.getItem('token');
  // ---hooks invokes----
  // const dispatch = useDispatch();

  //----states----
  const [isPending, setIsPending] = useState(false);

  const [totalData, setTotal] = useState<number | undefined>(0);

  const [loadedData, setLoaded] = useState<number | undefined>(0);

  const [failAlert, setFailAlert] = useState({
    open: false,
    message: "",
  });

  const [successAlert, setSuccessAlert] = useState({
    open: false,
    message: "",
  });

  const [serverResponse, setServerResponse] = useState<AxiosResponse|AxiosError>();

  const request = async ({
    customBaseUrl=undefined,

    customMethod = null,

    customFullUrl = null,

    customPath = null,

    id = null,

    onSuccess = (res:AxiosResponse) => {},
    onFail=(error:AxiosError)=>{},
    // customSuccessMessage = null,

    // customAuthorization = null,

    // customToken = null,

    params = {},

    body =null,

    noHeaders = false,
    token=Token
  } = {}) => {
    setIsPending(true);

    // ----errors throws----
    // if (!Boolean(path) && !Boolean(customPath))
    //   throw Error("you didn't specify a path for the request");

    // if (!Boolean(BASEURL) && !Boolean(customBaseUrl))
    //   throw Error("there is no domain to send data");

    // if (
    //   !Boolean(noHeaders) &&
    //   !Boolean(userInfo?.token) &&
    //   !Boolean(customToken)
    // )
    //   return "there is no token to send data";

    // if (!Boolean(method) && !Boolean(customMethod))
    //   throw Error("you didn't specify a method for the request");
   
    return axios(customFullUrl ? "" : BaseUrl ||  customBaseUrl,{
      method:  customMethod || method||"GET",
      baseURL:customFullUrl ? "" : BaseUrl ||  customBaseUrl,
      url: customFullUrl
        ? customFullUrl
        : `${customPath ? customPath : path}${id ? `${id}/` : ""}`,
      ...(!noHeaders && {
        headers: {
          //prettier-ignore
          "Authorization":token ?`${token}`:"",
          "Accept-Language": "en-US,en;",
          "Content-Type":contentType
        },
      }),
      params,
      data: body,
      responseType,
      onUploadProgress: (event) => {
        const { loaded, total } = event;
        setTotal(total);
        setLoaded(loaded);
      },
      onDownloadProgress: (event:any) => {
        const { loaded, total } = event;
        setTotal(total);
        setLoaded(loaded);
      },
    })
      .then((res:AxiosResponse) => {
        setIsPending(false);
        onSuccess(res);

        setSuccessAlert( successMessage?{
          open: true,
          message: successMessage
        }:{
          open: false,
          message: ""
        });

        setServerResponse(res);

        return res.data;
      })
      .catch((err) => {
        setIsPending(false);
       
        setServerResponse(err);

        const getValues:(data: any, values?: any[]) => any = (data:any, values = []) => {
          if (typeof data !== "object") {
            return [...values, data];
          }
          return Object.values(data).flatMap((v) => getValues(v, values));
        };

        setFailAlert({
          open: true,
          message:
            err?.response?.status === 400
              ? getValues(err.response.data).join(" - ")
              : err.message,
        });
        onFail(err)
        switch (err?.response?.status) {
          
          
          default:
            return err;

        }
      })
  };

  return [
    request,
    {
      isPending: isPending,
      successAlert: (
        <Snackbar
          open={successAlert.open}
          autoHideDuration={1000}
          onClose={() => setSuccessAlert((old) => ({ ...old, open: false }))}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={() => setSuccessAlert((old) => ({ ...old, open: false }))}
          >
            {successAlert.message}
          </Alert>
        </Snackbar>
      ),
      failAlert: (
        <Snackbar
          open={failAlert.open}
          autoHideDuration={1000}
          onClose={() => setFailAlert((old) => ({ ...old, open: false }))}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setFailAlert((old) => ({ ...old, open: false }))}
          >
            {failAlert.message}
          </Alert>
        </Snackbar>
      ),
      total: totalData,
      loaded: loadedData,
      serverResponse: serverResponse,
    },
  ];
};

export default useRequest;