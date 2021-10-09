class TplHtml {
  educationTpl1(edu){
    return `<div> <div class="resume-detail"><span class="detail-title">${edu.colleges}</span></div>`+
    `<div class="resume-detail padding-30">${edu.education}</div>`+
    `<div class="resume-detail padding-30">${edu.major}</div>`+
    `<div class="resume-detail padding-30">${edu.graduation_at}毕业</div>`+
    `</div>`
  }
  educationTpl2(edu){
    return this.educationTpl1(edu)
  }
  educationTpl3(edu){
    return `<div> <div class="resume-detail"><span class="detail-title">${edu.colleges}</span></div>`+
    `<div class="resume-detail">${edu.graduation_at}毕业</div>`+
    `<div class="resume-detail">${edu.major}</div>`+
    `<div class="resume-detail">${edu.education}</div>`+
    `</div>`
  }
  educationTpl4(edu){
    return this.educationTpl3(edu)
  }

  workTpl1(work){
    return '<div class="h-over">'+
    '<div class="main-row">'+
    '<div class="resume-detail"><span class="detail-title">' + work.company_name + '</span></div>'+
    '<div class="resume-detail padding-30"><span class="detail-title">' + work.job + '</span></div>'+
    '<div class="resume-detail padding-30">' + work.entry_at + '至' + work.leave_at + '</div>'+
    '</div>'+
    '<div class="resume-detail-1">' + work.job_content + '</div>'+
    '</div>'
  }
  workTpl2(work){
    return this.workTpl1(work)
  }
  workTpl3(work){
    return '<div class="h-over">'+
    '<div class="main-row">'+
    '<div class="resume-detail"><span class="detail-title">' + work.company_name + '</span></div>'+
    '<div class="resume-detail"><span class="detail-title">' + work.job + '</span></div>'+
    '<div class="resume-detail">' + work.entry_at + '至' + work.leave_at + '</div>'+
    '<div class="resume-detail-1">' + work.job_content + '</div>'+
    '</div>'+
    '</div>'
  }
  workTpl4(work){
    return this.workTpl3(work)
  }

  projectTpl1(project){
    return '<div class="h-over">'+
    '<div class="main-row">'+
    '<div class="resume-detail"><span class="detail-title">'+ project.project_name +'</span></div>'+
    '<div class="resume-detail padding-30"><span class="detail-title">'+ project.job +'</span></div>'+
    '<div class="resume-detail padding-30">'+ project.begin_at +'至'+ project.end_at +'</div>'+
    '</div>'+
    '<div class="resume-detail-1">'+ project.project_content +'</div>'+
    '</div>'
  }
  projectTpl2(project){
    return this.projectTpl1(project)
  }
  projectTpl3(project){
    return '<div class="h-over">'+
    '<div class="main-row">'+
    '<div class="resume-detail"><span class="detail-title">'+ project.project_name +'</span></div>'+
    '<div class="resume-detail padding-30"><span class="detail-title">'+ project.job +'</span></div>'+
    '<div class="resume-detail">'+ project.begin_at +'至'+ project.end_at +'</div>'+
    '<div class="resume-detail-1">'+ project.project_content +'</div>'+
    '</div>'+
    '</div>'
  }
  projectTpl4(project){
    return this.projectTpl3(project)
  }

  skillTpl1(sk){
    return '<div class="flex-4"><span class="detail-title">'+sk.skill_name+'：</span>'+sk.skill_level+'</div>'
  }
  skillTpl2(sk){
    return this.skillTpl1(sk);
  }
  skillTpl3(sk){
    return '<div class="flex-4"><span class="detail-title">'+sk.skill_name+'：</span>'+sk.skill_level+'</div>'
  }
  skillTpl4(sk){
    return this.skillTpl3(sk);
  }

  certificateTpl1(cer){
    return '<div class="flex-3"><span class="detail-title">'+cer.certificate_name+'：</span>'+cer.certificate_at+'</div>'
  }
  certificateTpl2(cer){
    return this.certificateTpl1(cer);
  }
  certificateTpl3(cer){
    return '<div class="flex-3"><span class="detail-title">'+cer.certificate_name+'：</span>'+cer.certificate_at+'</div>'
  }
  certificateTpl4(cer){
    return this.certificateTpl3(cer);
  }
}

module.exports = {
  TplHtml
}