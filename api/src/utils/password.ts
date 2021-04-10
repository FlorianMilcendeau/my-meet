import bcrypt from 'bcrypt';

const generatePassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);

    return hash;
};

export default generatePassword;
