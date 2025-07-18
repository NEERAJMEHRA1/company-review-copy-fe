import React, { memo } from "react";

export default memo(function ErrorText({ error }) {
  return <p style={{color:'red',fontSize:13}}>{error}</p>;
});
