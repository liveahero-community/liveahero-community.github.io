const elementTransform = (elementId: number) => {
  switch (elementId) {
    case 1:
      return '火';
    case 2:
      return '水';
    case 3:
      return '木';
    case 4:
      return '光';
    case 5:
      return '影';
    default:
      return '無';
  }
}

const roleTransform = (roleId: number) => {
  switch (roleId) {
    case 1:
      return '攻擊';
    case 2:
      return '防禦';
    case 3:
      return '強化';
    case 4:
      return '弱體化';
    case 5:
      return '速度操作';
    case 6:
      return '獲得 view';
    case 7:
      return '回復';
    case 99:
      return '特殊';
    default:
      return '無';
  }
}

export {
  elementTransform,
  roleTransform,
};
