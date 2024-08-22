import RecentStudies from './RecentStudies.js';
import ExploreStudies from './ExploreStudies.js';

import { useState, useEffect } from 'react';
import { cssTransition } from 'react-toastify';

function ListStudyForm() {
  const [click, setClick] = useState('');
  console.log(click);
  return (
    <>
      {/* <RecentStudies click={click} /> */}
      <ExploreStudies setClick={setClick} />
    </>
  );
}

export default ListStudyForm;
