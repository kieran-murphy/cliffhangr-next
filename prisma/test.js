const bcrypt = require('bcrypt');

const hashedPassword = '$2b$10$Oje/dAJmyYm425atuxpza.LG7kGIiNYVGIS57TrgbX2sEbpL4PrGy';
const password = 'marsh';

const compare = async () => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Is match inside compare function:', isMatch);

    return isMatch;
  } catch (error) {
    console.error('Error during comparison:', error);
    return false;
  }
};

compare().then((isMatch) => {
  console.log('Is match outside compare function:', isMatch);
});
