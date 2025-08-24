import { useState } from 'react';
import { Modal } from './components/Modal';
import { HookForm } from './components/HookForm';
import './App.css';
import { Display } from './components/Display';
import type { AppDispatch, RootState } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { UncontrolledForm } from './components/UncontrolledForm';
import type { Form } from './schemes/form';
import { setHookformData, setUncontrolledData } from './redux/formSlice';

const App = () => {
  const [isOpenUncontrolledForm, setIsOpenUncontrolledForm] = useState(false);
  const [isOpenReactHookForm, setIsOpenReactHookForm] = useState(false);
  const countries = useSelector((state: RootState) => state.form.countries);
  const hookformInformation = useSelector(
    (state: RootState) => state.form.hookform
  );
  const uncontrolledFormInformation = useSelector(
    (state: RootState) => state.form.uncontrolled
  );
  const dispatch = useDispatch<AppDispatch>();

  const setFormInStore = (data: Form, isHookForm: boolean) => {
    const reader = new FileReader();

    reader.readAsDataURL(data.image);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        if (isHookForm) {
          dispatch(setHookformData({ ...data, image: reader.result }));
        } else {
          dispatch(setUncontrolledData({ ...data, image: reader.result }));
        }
        close();
      }
    };
  };

  const openUncontrolledForm = () => {
    setIsOpenUncontrolledForm(true);
  };

  const openReactHookForm = () => {
    setIsOpenReactHookForm(true);
  };

  const close = () => {
    setIsOpenUncontrolledForm(false);
    setIsOpenReactHookForm(false);
  };

  return (
    <>
      <button
        onClick={openUncontrolledForm}
        className="block bg-amber-300 rounded-md w-40 mx-auto mt-5"
      >
        Uncontrolled Form
      </button>
      <button
        onClick={openReactHookForm}
        className="block bg-amber-300 rounded-md mt-5 w-40 mx-auto"
      >
        React Hook Form
      </button>
      <Modal isOpen={isOpenUncontrolledForm} close={close}>
        <UncontrolledForm
          setFormInStore={setFormInStore}
          countries={countries}
        />
      </Modal>
      <Modal isOpen={isOpenReactHookForm} close={close}>
        <HookForm setFormInStore={setFormInStore} countries={countries} />
      </Modal>
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <Display data={hookformInformation} formName={'Hook Form'} />
        <Display
          data={uncontrolledFormInformation}
          formName={'Uncontrolled Form'}
        />
      </div>
    </>
  );
};

export default App;
