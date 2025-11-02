import { composeMiddleware } from '@gaman/core';

export default composeMiddleware((_, next) => {
  console.log("berhasil middleware jalan");
	return next();
});
