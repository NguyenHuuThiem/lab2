import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  FlatList,
  Pressable
} from "react-native";
import {useState} from 'react';

export default function App() {
  const data = [
    {
      id: 1,
      name: 'Nguyễn Hữu Thiêm',
      tuoi: 20,
      diaChi: 'Nam Định',
      email: 'thiemnhph19987@fpt.edu.vn'
    },
    {
      id: 2,
      name: 'Nguyễn Bình Thuận',
      tuoi: 20,
      diaChi: 'Nam Định',
      email: 'thuannbph19989@fpt.edu.vn'
    },
  ];
 // để danh sách render lại khi có dữ liệu mới thì cần danh sách dạng state
  const [productList, setProductList] = useState(data);
  const [isShowAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [diaChiValue, setDiaChiValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [tuoiValue, setTuoiValue] = useState(0);

  const handleClose = () => {
    setNameValue('');
    setTuoiValue(0);
    setEditId(0);
    setShowAdd(false);
  }

  const handleAdd = () => {
    // nếu có editId thì đang sửa và cần cập nhật phần tử
    if (editId) {
      const newEditProductList = [...productList];
      for (let i = 0; i < newEditProductList.length; i++) {
        if (newEditProductList[i].id == editId) {
          newEditProductList[i].name = nameValue;
          newEditProductList[i].tuoi = tuoiValue;
          newEditProductList[i].diaChi = diaChiValue;
          newEditProductList[i].email = emailValue;

        }
      }
      setProductList(newEditProductList);
      return handleClose();
    }
      
    
    // khi bấm luu sẽ gọi hàm này
    // 1. định nghĩa object mới sẽ được thêm vào mảng dữ liệu
    const newItem = {
      id: productList == 0
      ? 1 
       :productList[productList.length - 1].id + 1,
      name: nameValue,
      tuoi: tuoiValue,
      diaChi: diaChiValue,
      email: emailValue
    };
    //2. thêm phần tử mới vào mảng sau đó cập nhật lại danh sách
    //... sẽ lấy ra toàn bộ phần tử của mảng, sau đó ghép cùng phần tử mới
    const newProductList = [...productList, newItem];
     //3. cập nhật ds mới để hiển thị 
    setProductList(newProductList);
    //4. cập nhật input về danh sách mặc định và đóng modal
    setNameValue(''); setTuoiValue(0); setDiaChiValue(''); setEmailValue(''); setShowAdd(false);
  };

  const handleDelete = (deleteId) => {
    const newProductList = productList
    .filter(item => item.id !== deleteId);// trả về 1 mảng
    setProductList(newProductList);
  };

  // hàm sửa chạy khi bấm nút sửa ở từng phần tử
  const handleEdit = (id) => {
    //1. hiển thị modal lên
      setShowAdd(true);
    //2. Truyền giá trị cần sửa vào TextInput
    const editItem = productList
    .find(item => item.id == editId);// trả về 1 phần tử
    setNameValue(editItem.name);
    setTuoiValue(editItem.tuoi);
    setDiaChiValue(editItem.diaChi);
    setEmailValue(editItem.email);
    setEditId(editItem.id);
  };

  return (
    <View style={styles.container}>
      {isShowAdd
        ? null
        : <Button 
        title="Thêm mới" onPress={() => setShowAdd(true)} />
        
      }
      {/* visible của modal sẽ thể hiện trạng thái ẩn hiện */}
      {/* thay thế cho cách dùng toán tử 3 ngôi để ẩn hiện giao diện */}
      <Modal visible={isShowAdd} animationType="slide">
        <View>
          {/* <Text>{nameValue}</Text> */}
          <TextInput placeholder="Tên"
            value={nameValue}
            onChangeText={(text) => setNameValue(text)}
          />
          <TextInput placeholder="Tuổi" keyboardType="numeric"
            value={tuoiValue}
            onChangeText={(text) => setTuoiValue(text)}
          />
          <TextInput placeholder="Địa chỉ"
            value={diaChiValue}
            onChangeText={(text) => setDiaChiValue(text)}
          />
          <TextInput placeholder="Email" 
            value={emailValue}
            onChangeText={(text) => setEmailValue(text)}
          />
          <Button title="Hủy" onPress={() => setShowAdd(false)} />
          <Button title="Lưu" onPress={() => handleAdd()}/>
          
        </View>
      </Modal>
      <FlatList
        data={productList}
        renderItem={({item}) => <View>
          <Text>{item.id}</Text>
          <Text>Tên: {item.name}</Text>
          <Text>Tuổi: {item.tuoi}</Text>
          <Text>Địa chỉ: {item.diaChi}</Text>
          <Text>Email: {item.email}</Text>

          {/* Xóa */}
          <Pressable onPress={() => handleDelete(item.id)}>
            <Text>Xóa</Text>
          </Pressable>

          <Pressable onPress={() => handleEdit(item.id)}>
            <Text>Update</Text>
          </Pressable>
        </View>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    // tên của phần thay đổi giao diện
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 30,
  },
});
