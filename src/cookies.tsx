import JWT from "expo-jwt";

const secretKey = "IngredientLens"; //required

export function checkToken(token:string | any) {
    try {
        // Verify and decode the token using the secret key
        if (token){
            const handledToken = token + '';
            // const decoded = jwt.verify(token, secretKey);
            const decoded = JWT.decode(handledToken, secretKey);//, {algorithm: SupportedAlgorithms.HS256});
            console.log(decoded);
            if (decoded && typeof decoded === 'object' && 'login' in decoded) {
                // At this point, TypeScript knows that decoded is a JwtPayload
                return decoded;
              } else {
                return null;
              }
        }
        else{
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export function createToken(userLogin:string){
    const token = JWT.encode({ login: userLogin }, secretKey); //{algorithm: SupportedAlgorithms.HS512});
    console.log(token);
    return token;
}