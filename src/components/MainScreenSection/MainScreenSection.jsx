import CalendarPart from './CalendarPart/CalendarPart';
import CarsInWorkOrDoneList from './CarsInWorkOrDoneList/CarsInWorkOrDoneList';
import { IoCarSport } from 'react-icons/io5';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BsCameraFill, BsBoxArrowLeft } from 'react-icons/bs';
import { BiSolidMessageDetail } from 'react-icons/bi';
import css from './MainScreenSection.module.css';
import { useState } from 'react';
import DiagnosticScreen from '../DiagnosticScreen/DiagnosticScreen';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectCars } from '../../redux/cars/selectors';
import { Link } from 'react-router-dom';
import { selectBalance } from '../../redux/auth/selectors.js';
import { clearChosenDate } from '../../redux/cars/slice.js';

export default function MainScreenSection({ array1, array2, wage }) {
  // const [car, setCar] = useState('');
  // const [diagOpen, setDiagOpen] = useState(false);
  const cars = useSelector(selectCars);
  const balance = useSelector(selectBalance);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    sessionStorage.removeItem('date');
    dispatch(clearChosenDate());
  };

  console.log('cars', cars);

  const date = sessionStorage.getItem('date');

  const checkDate = dayOfRecord => {
    const currentDate = new Date(date);
    // const dateOfRecord = time;

    // const [hours, minutes] = timeOfRecord.split(':').map(Number);
    const dateOfRecord = new Date(dayOfRecord);
    // dateOfRecord.setHours(hours, minutes, 0, 0);

    console.log(
      'dateOfRecord > currentTime',
      new Date(dateOfRecord) > new Date(currentDate)
    );
    // console.log('dateOfRecord', new Date(dateOfRecord));
    // console.log('currentTime', new Date(currentTime));

    return new Date(dateOfRecord) > new Date(currentDate);
  };

  const carsInWork = cars?.filter(car =>
    car?.status === 'diagnostic' ? !car?.diagnostic_id : !car.complete_date
  );
  const carsDone = cars?.filter(car =>
    car?.status === 'diagnostic' ? car?.diagnostic_id : car.complete_date
  );
  console.log('carsInWork', carsInWork);
  // console.log('carsDone', carsDone);

  const filteredCarsInWork = carsInWork.filter(car => !checkDate(car.date));
  console.log('filteredCarsInWork', filteredCarsInWork);

  const carsArray = () => {
    if (
      date === new Date().toISOString().split('T')[0] ||
      date < new Date().toISOString().split('T')[0]
    ) {
      return filteredCarsInWork.filter(
        car =>
          car.date.split('T')[0] < new Date().toISOString().split('T')[0] ||
          car.date.split('T')[0] === date
      );
    } else if (date > new Date().toISOString().split('T')[0]) {
      return filteredCarsInWork.filter(car => car.date.split('T')[0] === date);
    }
  };

  // console.log('carsArray', carsArray);

  const carsDoneForParticularDay = carsDone?.filter(car =>
    car?.status === 'diagnostic'
      ? car?.diagnostic_created_at.split('T')[0] === date
      : car?.status === 'repair'
      ? car?.repair_created_at.split('T')[0] === date
      : ''
  );

  console.log('carsDoneForParticularDay', carsDoneForParticularDay);

  return (
    <div className={css.sectionWrapper}>
      {/* //   <div className={css.topPart}>
    //     <div className={css.mechNameBox}>
    //       <p className={css.name}>Блудов О.А.</p>
    //       <p className={css.paleText}>Механік</p>
    //     </div>
    //     <div className={css.salaryInfoBox}>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Нараховано</p>
    //         <p className={css.amount}>{wage}</p>
    //       </div>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Сьогодні</p>
    //         <p className={css.amount}>{'+' + wage}</p>
    //       </div>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Можлива ЗП</p>
    //         <p className={css.amountPossible}>{amountPossible}</p>
    //       </div>
    //     </div>
    //   </div> */}

      {/* <CalendarPart /> */}

      {/* {diagOpen ? (
        <DiagnosticScreen setDiagOpen={setDiagOpen} />
      ) : (
        <> */}
      <CarsInWorkOrDoneList list={carsArray()} />

      <Link to="/add-car" className={css.btnAddPhoto}>
        <IoCarSport className={css.icon} />
        <BsPlusCircleDotted className={css.icon} />
        <BsCameraFill className={css.icon} />
      </Link>

      <CarsInWorkOrDoneList
        done={true}
        list={carsDoneForParticularDay}
        // setDiagOpen={setDiagOpen}
      />

      <div className={css.bottomPart}>
        <button className={css.exitBox} onClick={() => handleLogOut()}>
          <BsBoxArrowLeft className={css.iconExit} />
        </button>
        <BiSolidMessageDetail className={css.iconMessage} />
        <p className={css.wage}>+ {balance?.today_earned ?? '----'}</p>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
