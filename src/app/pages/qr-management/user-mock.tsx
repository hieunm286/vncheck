export const groupSeeding = {
  manager: {
    fullName: 'Người quản lý gieo giống'
  },
  leader: [
    {
      fullName: 'Người tổ trưởng gieo giống 1',
    }, 
    {
      fullName: 'Người tổ trưởng gieo giống 2',
    }
  ],
  technical: [
    {
      fullName: 'Người kĩ thuật gieo giống 1',
    }, 
    {
      fullName: 'Người kĩ thuật gieo giống 2',
    }
  ],
  worker: [
    {
      fullName: 'Người công nhân gieo giống 1',
    }, 
    {
      fullName: 'Người công nhân gieo giống 2',
    }
  ],
};

export const groupPlanting = {
  manager: {
    fullName: 'Quản lý',
  },
  leader: [
    {
      fullName: 'Tổ trưởng 1',
    }, 
    {
      fullName: 'tổ trưởng 2',
    }
  ],
  technical: [
    {
      fullName: 'Kĩ thuật 1',
    }, 
    {
      fullName: 'Kĩ thuật 2',
    }
  ],
  worker: [
    {
      fullName: 'Công nhân 1',
    }, 
    {
      fullName: 'Công nhân 2',
    }
  ],
};

export const groupHarvesting = {
  manager: {
    fullName: 'Tổng giám đốc thu hoạch'
  },
  leader: [
    {
      fullName: 'Người tổ trưởng thu hoạch 1',
    }, 
    {
      fullName: 'Người tổ trưởng thu hoạch 2',
    }
  ],
  technical: [
    {
      fullName: 'Người kĩ thuật thu hoạch 1',
    }, 
    {
      fullName: 'Người kĩ thuật thu hoạch 2',
    }
  ],
  worker: [
    {
      fullName: 'Người công nhân thu hoạch 1',
    }, 
    {
      fullName: 'Người công nhân thu hoạch 2',
    }
  ],

  // Redundant field
  technicalStaff: [
    {
      _id: 'redundant field',
      isRecieved: false,
      info: 'redundant field'
    }
  ],
};