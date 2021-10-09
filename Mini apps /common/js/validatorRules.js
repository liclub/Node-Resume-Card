const rules = {
  basic: {
    rule: {
      user_name: {
        required: true,
      },
      sex: {
        required: true,
      },
      job: {
        required: true,
      },
      birthday: {
        required: true,
      },
      education: {
        required: true,
      },
      work_years: {
        required: true,
      },
      city: {
        required: true,
      }
    },
    message: {
      user_name: {
        required: '请输入姓名',
      },
      sex: {
        required: '请选择姓别',
      },
      job: {
        required: '请输入职位',
      },
      birthday: {
        required: '请选择出生日期',
      },
      education: {
        required: '请选择最高学历',
      },
      work_years: {
        required: '请选择工作经验',
      },
      city: {
        required: '请选择所在城市',
      }
    }
  },
  contact: {
    rule: {
      mobile: {
        required: true,
        tel: true
      },
      email: {
        required: true,
        email: true
      },
      wechat: {
        maxlength: 50,
      },
      qq: {
        maxlength: 50,
      },
      weibo: {
        maxlength: 50,
      }
    },
    message: {
      mobile: {
        required: '请输入手机号',
        tel: '手机号格式不正确'
      },
      email: {
        required: '请输入邮箱',
        email: '邮箱格式不正确'
      },
      wechat: {
        maxlength: '最多50个字符',
      },
      qq: {
        maxlength: '最多50个字符',
      },
      weibo: {
        maxlength: '最多50个字符',
      }
    }
  },
  self: {
    rule: {
      introduce: {
        required: true,
        maxlength: 500
      }
    },
    message: {
      introduce: {
        required: '请输入自我介绍',
        maxlength: '自我介绍最长500个字符'
      }
    }
  },
  education_edit: {
    rule: {
      colleges: {
        required: true,
        maxlength: 50
      },
      major: {
        required: true,
        maxlength: 50
      },
      education: {
        required: true
      },
      graduation_at: {
        required: true
      }
    },
    message: {
      colleges: {
        required: '请输入院校',
        maxlength: '院校最长50个字符'
      },
      major: {
        required: '请输入专业',
        maxlength: '专业最长50个字符'
      },
      education: {
        required: '请选择学历'
      },
      graduation_at: {
        required: '请选择毕业时间'
      }
    }
  },
  work_edit: {
    rule: {
      company_name: {
        required: true,
        maxlength: 50
      },
      job: {
        required: true,
        maxlength: 50
      },
      entry_at: {
        required: true
      },
      leave_at: {
        required: true
      },
      job_content: {
        required: true,
        maxlength: 500
      }
    },
    message: {
      company_name: {
        required: '请输入公司名称',
        maxlength: '公司名称最长50个字符'
      },
      job: {
        required: '请输入职位',
        maxlength: '职位最长50个字符'
      },
      entry_at: {
        required: '请选择入职时间'
      },
      leave_at: {
        required: '请选择离职时间'
      },
      job_content: {
        job_content: '请输入工作内容',
        maxlength: '工作内容最长500个字符'
      }
    }
  },
  project_edit: {
    rule: {
      project_name: {
        required: true,
        maxlength: 50
      },
      link_url: {
        maxlength: 200
      },
      job: {
        required: true,
        maxlength: 50
      },
      begin_at: {
        required: true
      },
      end_at: {
        required: true
      },
      project_content: {
        required: true,
        maxlength: 500
      }
    },
    message: {
      project_name: {
        required: '请输入项目名称',
        maxlength: '项目名称最长50个字符'
      },
      link_url: {
        maxlength: '项目链接最长200个字符'
      },
      job: {
        required: '请输入职责',
        maxlength: '职责最长50个字符'
      },
      begin_at: {
        required: '请选择项目开始时间'
      },
      end_at: {
        required: '请选择项目结束时间'
      },
      project_content: {
        required: '请输入工作内容',
        maxlength: '项目描述最长50个字符'
      }
    }
  },
  skill_edit: {
    rule: {
      skill_name: {
        required: true,
        maxlength: 50
      },
      skill_level: {
        required: true
      }
    },
    message: {
      skill_name: {
        required: '请输入技能名称',
        maxlength: '技能名称最长50个字符'
      },
      skill_level: {
        required: '请选择技能等级'
      }
    }
  },
  certificate_edit: {
    rule: {
      certificate_name: {
        required: true,
        maxlength: 50
      },
      certificate_at: {
        required: true
      }
    },
    message: {
      certificate_name: {
        required: '请输入证书名称',
        maxlength: '证书名称最长50个字符'
      },
      certificate_at: {
        required: '请选择获取时间'
      }
    }
  },
  emailSend: {
    rule: {
      email: {
        required: true,
        email: true
      },
      title: {
        required: true
      },
      tpl: {
        require: true
      }
    },
    message: {
      email: {
        required: '请输入邮箱',
        email: '邮箱格式不正确'
      },
      title: {
        required: '请输入标题'
      },
      tpl: {
        require: '请选择模板'
      }
    }
  }
}


module.exports = {
  rules
}