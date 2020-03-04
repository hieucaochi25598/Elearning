import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { Formik, Form } from 'formik';
import { MyInput } from './FormEditAccount';
import { useDispatch } from 'react-redux';
import { addMoneyAction } from '../../actions/userActions';
const FormAddMoney = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <Modal isOpen={props.isOpenAddMoney} toggle={() => props.handleCloseAddMoney()}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
        <Formik initialValues={{
            codeConfirm: '',
            moneyMount: ''
        }}
        onSubmit={values => dispatch(addMoneyAction(values))}
        >
                {({handleSubmit}) => 
                <Form>
                    <FormGroup>
                        <Label>Code xác thực</Label>
                        <MyInput name="codeConfirm" type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Số tiền nạp</Label>
                        <MyInput name="moneyMount" type="number"/>
                    </FormGroup>
                    <Button color="primary" onClick={() => {handleSubmit(); props.handleCloseAddMoney()}} >Xác nhận</Button>{' '}
                    <Button color="secondary" onClick={() => props.handleCloseAddMoney()}>Hủy</Button>
                </Form>
                }
            </Formik>
        </ModalBody>
        
          
        
      </Modal>
            
        </div>
    )
}
export default FormAddMoney
