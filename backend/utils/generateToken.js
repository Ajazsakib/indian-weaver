import jwt from 'jsonwebtoken';
import cookie from 'cookie';
const generateToken = (res, userId) =>
{

  const token = jwt.sign({ userId }, "abc123", {
    expiresIn: '30d',
  });

  // // Parse cookies manually from the request headers
  // const parsedCookies = cookie.parse(res.getHeader('Set-Cookie') || '');

  // // Set JWT as an HTTP-Only cookie
  // const updatedCookies = cookie.serialize('jwt', token, {
  //   httpOnly: true,
  //   secure: true, // Use secure cookies in production
  //   sameSite: 'strict', // Prevent CSRF attacks
  //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  // });

  // // Append the new cookie to the existing cookies
  // res.setHeader('Set-Cookie', parsedCookies ? `${parsedCookies}; ${updatedCookies}` : updatedCookies);
  return token
};

export default generateToken;
