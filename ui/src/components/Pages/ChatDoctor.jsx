import React from "react";

const ChatDoctor = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="chat-window">
                  <div className="chat-cont-left">
                    <div className="chat-header">
                      <span>Chats</span>
                      <a href="javascript:void(0)" className="chat-compose">
                        <i className="material-icons">control_point</i>
                      </a>
                    </div>
                    <form className="chat-search">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <i className="fas fa-search"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                    <div className="chat-users-list">
                      <div className="chat-scroll">
                        <a href="javascript:void(0);" className="media">
                          <div className="media-img-wrap">
                            <div className="avatar avatar-away">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Richard Wilson</div>
                              <div className="user-last-chat">
                                Hey, How are you?
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">2 min</div>
                              <div className="badge badge-success badge-pill">
                                15
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat active"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-online">
                              <img
                                src="assets/img/patients/patient1.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Charlene Reed</div>
                              <div className="user-last-chat">
                                I'll call you later{" "}
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                8:01 PM
                              </div>
                            </div>
                          </div>
                        </a>
                        <a href="javascript:void(0);" className="media">
                          <div className="media-img-wrap">
                            <div className="avatar avatar-away">
                              <img
                                src="assets/img/patients/patient2.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Travis Trimble </div>
                              <div className="user-last-chat">
                                Give me a full explanation about our project
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                7:30 PM
                              </div>
                              <div className="badge badge-success badge-pill">
                                3
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-online">
                              <img
                                src="assets/img/patients/patient3.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Carl Kelly</div>
                              <div className="user-last-chat">
                                That's very good UI design
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                6:59 PM
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-offline">
                              <img
                                src="assets/img/patients/patient4.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Michelle Fairfax</div>
                              <div className="user-last-chat">
                                Yesterday i completed the task
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                11:21 AM
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-online">
                              <img
                                src="assets/img/patients/patient5.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Gina Moore</div>
                              <div className="user-last-chat">
                                What is the major functionality?
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                10:05 AM
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-away">
                              <img
                                src="assets/img/patients/patient6.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Elsie Gilley</div>
                              <div className="user-last-chat">
                                This has allowed me to showcase not only my
                                technical skills
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                Yesterday
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-offline">
                              <img
                                src="assets/img/patients/patient7.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Joan Gardner</div>
                              <div className="user-last-chat">
                                Let's talk briefly in the evening.{" "}
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">Sunday</div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-online">
                              <img
                                src="assets/img/patients/patient8.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Daniel Griffing</div>
                              <div className="user-last-chat">
                                Do you have any collections? If so, what of?
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">
                                Saturday
                              </div>
                            </div>
                          </div>
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="media read-chat"
                        >
                          <div className="media-img-wrap">
                            <div className="avatar avatar-away">
                              <img
                                src="assets/img/patients/patient9.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div>
                              <div className="user-name">Walter Roberson</div>
                              <div className="user-last-chat">
                                Connect the two modules with in 1 day.
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">Friday</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="chat-cont-right">
                    <div className="chat-header">
                      <a
                        id="back_user_list"
                        href="javascript:void(0)"
                        className="back-user-list"
                      >
                        <i className="material-icons">chevron_left</i>
                      </a>
                      <div className="media">
                        <div className="media-img-wrap">
                          <div className="avatar avatar-online">
                            <img
                              src="assets/img/patients/patient.jpg"
                              alt="User Image"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div className="user-name">Richard Wilson</div>
                          <div className="user-status">online</div>
                        </div>
                      </div>
                      <div className="chat-options">
                        <a
                          href="javascript:void(0)"
                          data-toggle="modal"
                          data-target="#voice_call"
                        >
                          <i className="material-icons">local_phone</i>
                        </a>
                        <a
                          href="javascript:void(0)"
                          data-toggle="modal"
                          data-target="#video_call"
                        >
                          <i className="material-icons">videocam</i>
                        </a>
                        <a href="javascript:void(0)">
                          <i className="material-icons">more_vert</i>
                        </a>
                      </div>
                    </div>
                    <div className="chat-body">
                      <div className="chat-scroll">
                        <ul className="list-unstyled">
                          <li className="media sent">
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>Hello. What can I do for you?</p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:30 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="media received">
                            <div className="avatar">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>I'm just looking around.</p>
                                  <p>
                                    Will you tell me something about yourself?
                                  </p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:35 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="msg-box">
                                <div>
                                  <p>Are you there? That time!</p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:40 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="msg-box">
                                <div>
                                  <div className="chat-msg-attachments">
                                    <div className="chat-attachment">
                                      <img
                                        src="assets/img/img-02.jpg"
                                        alt="Attachment"
                                      />
                                      <div className="chat-attach-caption">
                                        placeholder.jpg
                                      </div>
                                      <a
                                        href="#"
                                        className="chat-attach-download"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    </div>
                                    <div className="chat-attachment">
                                      <img
                                        src="assets/img/img-03.jpg"
                                        alt="Attachment"
                                      />
                                      <div className="chat-attach-caption">
                                        placeholder.jpg
                                      </div>
                                      <a
                                        href="#"
                                        className="chat-attach-download"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    </div>
                                  </div>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:41 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="media sent">
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>Where?</p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:42 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="msg-box">
                                <div>
                                  <p>
                                    OK, my name is Limingqiang. I like singing,
                                    playing basketballand so on.
                                  </p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:42 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="msg-box">
                                <div>
                                  <div className="chat-msg-attachments">
                                    <div className="chat-attachment">
                                      <img
                                        src="assets/img/img-04.jpg"
                                        alt="Attachment"
                                      />
                                      <div className="chat-attach-caption">
                                        placeholder.jpg
                                      </div>
                                      <a
                                        href="#"
                                        className="chat-attach-download"
                                      >
                                        <i className="fas fa-download"></i>
                                      </a>
                                    </div>
                                  </div>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:50 AM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="media received">
                            <div className="avatar">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>You wait for notice.</p>
                                  <p>Consectetuorem ipsum dolor sit?</p>
                                  <p>Ok?</p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>8:55 PM</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="chat-date">Today</li>
                          <li className="media received">
                            <div className="avatar">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit,
                                  </p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>10:17 AM</span>
                                      </div>
                                    </li>
                                    <li>
                                      <a href="#">Edit</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="media sent">
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <p>Lorem ipsum dollar sit</p>
                                  <div className="chat-msg-actions dropdown">
                                    <a
                                      href="#"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      <i className="fe fe-elipsis-v"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a className="dropdown-item" href="#">
                                        Delete
                                      </a>
                                    </div>
                                  </div>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>10:19 AM</span>
                                      </div>
                                    </li>
                                    <li>
                                      <a href="#">Edit</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="media received">
                            <div className="avatar">
                              <img
                                src="assets/img/patients/patient.jpg"
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                            <div className="media-body">
                              <div className="msg-box">
                                <div>
                                  <div className="msg-typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-footer">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <div className="btn-file btn">
                            <i className="fa fa-paperclip"></i>
                            <input type="file" />
                          </div>
                        </div>
                        <input
                          type="text"
                          className="input-msg-send form-control"
                          placeholder="Type something"
                        />
                        <div className="input-group-append">
                          <button type="button" className="btn msg-send-btn">
                            <i className="fab fa-telegram-plane"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade call-modal" id="voice_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="call-box incoming-box">
                <div className="call-wrapper">
                  <div className="call-inner">
                    <div className="call-user">
                      <img
                        alt="User Image"
                        src="assets/img/patients/patient.jpg"
                        className="call-avatar"
                      />
                      <h4>Richard Wilson</h4>
                      <span>Connecting...</span>
                    </div>
                    <div className="call-items">
                      <a
                        href="javascript:void(0);"
                        className="btn call-item call-end"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="material-icons">call_end</i>
                      </a>
                      <a href="VoiceCall" className="btn call-item call-start">
                        <i className="material-icons">call</i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade call-modal" id="video_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="call-box incoming-box">
                <div className="call-wrapper">
                  <div className="call-inner">
                    <div className="call-user">
                      <img
                        className="call-avatar"
                        src="assets/img/patients/patient.jpg"
                        alt="User Image"
                      />
                      <h4>Richard Wilson</h4>
                      <span>Calling ...</span>
                    </div>
                    <div className="call-items">
                      <a
                        href="javascript:void(0);"
                        className="btn call-item call-end"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="material-icons">call_end</i>
                      </a>
                      <a href="VideoCall" className="btn call-item call-start">
                        <i className="material-icons">videocam</i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDoctor;
