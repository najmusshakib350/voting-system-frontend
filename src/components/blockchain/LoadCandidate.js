//candidate info array function
export function CandidateInfoArray(candidate, filterArr) {
  for (let i = 0; i < candidate.length; i++) {
    let obj = {
      ...candidate[i],
    };
    let newObj = {
      name: obj.name,
      party: obj.party,
      age: obj.age,
      qualification: obj.qualification,
      nidnumber: obj.nidnumber,
      votecount: obj.voteCount,
    };
    filterArr.push(newObj);
  }
  return filterArr;
}
