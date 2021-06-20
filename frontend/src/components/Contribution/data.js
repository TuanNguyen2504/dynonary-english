import wordApi from 'apis/wordApi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import Contribution from './index';

const analysisExample = (exampleStr = '', word = '') => {
  if (typeof exampleStr !== 'string' || exampleStr === '') {
    return [];
  }

  const exampleArr = exampleStr.split('\n');
  for (let str of exampleArr) {
    if (str.toLocaleLowerCase().indexOf(word.toLocaleLowerCase()) === -1) {
      return false;
    }
  }

  return exampleArr;
};

function ContributionData() {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);
      const { examples, synonyms, word, ...rest } = data;

      // check examples validation
      const exampleArr = analysisExample(examples, word);
      if (typeof exampleArr === 'boolean' && !exampleArr) {
        dispatch(
          setMessage({
            type: 'warning',
            message: 'Câu ví dụ phải chứa từ vựng mới.',
          }),
        );
        setSubmitting(false);
        return;
      }

      // split synonyms string to an array synonyms
      const synonymArr = synonyms !== '' ? synonyms.split('\n') : [];

      // call API
      const dataSend = {
        ...rest,
        examples: exampleArr,
        synonyms: synonymArr,
        word,
      };
      const apiRes = await wordApi.postContributeWord(dataSend);

      if (apiRes.status === 200) {
        dispatch(
          setMessage({
            type: 'success',
            message:
              'Thêm thành công, đang chờ xét duyệt. Cảm ơn sự đóng góp của bạn ❤',
            duration: 5000,
          }),
        );
        setSubmitting(false);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Thêm từ mới không thành công, thử lại';
      dispatch(
        setMessage({
          type: 'error',
          message,
        }),
      );
      setSubmitting(false);
    }
  };

  return <Contribution onSubmitForm={handleSubmit} submitting={submitting} />;
}

export default ContributionData;