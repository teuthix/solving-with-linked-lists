const cycle = (list) => {
  let pointer1 = list.head;
  let pointer2 = list.head;
  
  while (pointer1 !== null && pointer1.next !== null) {
    pointer1 = pointer1.next;
    
    if (pointer2 === null || pointer2.next === null) {
      return false;
    }
    
    pointer2 = pointer2.next.next;
    
    if (pointer1 === pointer2) {
      return true;
    }
  }
  return false;
};

module.exports = cycle;
