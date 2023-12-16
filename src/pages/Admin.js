import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const AdminPage = () => {
  //let history = useHistory();
  const navigate = useNavigate();

 // const [username, setUsername] = useLocalStorage("name", "");
  const [login, setLogin] = useLocalStorage("login", "false");
  console.log('login getLogin:', login)
  /*
    // useState hook to keep track of the login state
    const [login, setLogin] = useState(() => {
      //return JSON.parse(localStorage.getItem("login"));
      const login = JSON.parse(localStorage.getItem("login"));
      console.log('login getLogin:', login)
      //console.log('typeof',typeof login)
      return login
    });
*/
  // Updating the local storage whenever 
  // the login state changes
  useEffect(() => {
    console.log('Login state effect:', login)
    //localStorage.setItem("login", JSON.stringify(login));
    //localStorage.setItem("login", login);
    setLogin(login);
  }, [login]);


  //const loginlocal = JSON.parse(localStorage.getItem("login"));
  //console.log('Login loginlocal:', loginlocal)
  //const login = Boolean(localStorage.getItem("login"))
  //console.log('login effect:', login)
  //login = Boolean(login)
  //console.log('login Boolean:', login)

  // Click Handler updates the login state
  // when the button is clicked
  const click = () => {
    setLogin((prev) => {
      console.log('login prev:', prev)

      return !prev;
    });
  }
 
	return(
    <Container>
            {
        login ? (
             //children 
             <Row>
             <Col>
             <Stack direction="horizontal" gap={2}>
          <Button as="a" href="/createpost" variant="primary">
              createpost
          </Button>
          <Button as="a"  href="/CreateTire" variant="success">
            CreateTire
          </Button>
        </Stack>;
        <Badge bg="danger" as={Button} onClick={
          () => click()
          } >{login ? "Logout" : "Login"} </Badge >
           </Col>
         </Row>
          ) : 
          navigate("/Login")
         //history.push("/Login")
         //navigate('/Login', { replace: true })
        }
           
       </Container> 
        )
  }

export default AdminPage;
