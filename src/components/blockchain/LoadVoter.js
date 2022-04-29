//voter info array function
export function VoterInfoArray(getVoter, voterArr, status = "") {
  for (let i = 0; i < getVoter.length; i++) {
    let obj = {
      ...getVoter[i],
    };
    let newObj = {
      nid: obj.nid,
      status: obj.status,
      email: obj.email,
      address: obj.voteraddress,
    };

    if (status === 0) {
      if (parseInt(newObj.status) === 0) {
        voterArr.push(newObj);
      }
    } else {
      voterArr.push(newObj);
    }
  }
  return voterArr;
}
