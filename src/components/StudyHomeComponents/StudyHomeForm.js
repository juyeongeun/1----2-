import RecentStudies from './RecentStudies.js';
import ExploreStudies from './ExploreStudies.js';

import { useState } from 'react';

function StudyHomeForm({ paramsReset }) {
  const [click, setClick] = useState('');
  return (
    <>
      <RecentStudies click={click} />
      <ExploreStudies setClick={setClick} paramsReset={paramsReset} />
    </>
  );
}

export default StudyHomeForm;
