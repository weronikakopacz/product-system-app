import { DocumentSnapshot, collection, getDocs, getFirestore } from "@firebase/firestore";
import { UserData } from "../models/IUserData";

const getAllUsers = async (): Promise<UserData[]> => {
  const firestore = getFirestore();
  const usersCollection = collection(firestore, 'users');

  try {
    const querySnapshot = await getDocs(usersCollection);

    const userDataList: UserData[] = [];

    querySnapshot.forEach((userDocSnapshot: DocumentSnapshot) => {
      if (userDocSnapshot.exists()) {
        const userData: UserData = userDocSnapshot.data() as UserData;
        userDataList.push(userData);
      }
    });

    return userDataList;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export { getAllUsers };