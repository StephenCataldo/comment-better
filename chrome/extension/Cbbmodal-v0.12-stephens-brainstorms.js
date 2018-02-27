/* Stephen's orginal pile of ideas:
 * This works, and is probably worth looking at content ideas which
 * will be cut for quick cleanup moving forward. 
 */



import React, { PropTypes, Component } from 'react';
//import style from '../assets/bccModalx.css';

export default class CbbModal extends Component { 

  constructor(props) {
    super(props);
    this.showThisTab = this.showThisTab.bind(this);
  }
  
  showThisTab(e) {
    //none anyway: e.preventDefault();
    e.stopPropagation();
    console.log('>>>>>  A modal tab was clicked.');
    console.log(e.target);
    // Programmer note: probably switch this to React. Though
    // some of what I've been reading indicates that css rather than
    // DOM changes actually are faster. See: #jQuery_vs_React_hide
    $('.cbbContent').hide();
    $(e.target).find('.cbbContent').show();
  }
  
  render() {
    return (
<div id="cbModal">
  <div id="tabs"><ul>
    <li id="p1" onClick={this.showThisTab}>Listen <br/>& Ask
      <div className="cbbContent">
        <div id="cbb-yesAnd" title="Yes. And..." className="sg sgsm agree"><clip>Yes. And...</clip>
          <div className="more">
          "Yes, and..." I sometimes heard as "Yes, but..."
          <br/>Using more words sometimes helps.

          </div>
        </div>
        <div id="cbb-yesAnd" title="Yes. And..." className="sg sgrt agree">
          <clip>I think I see where you're coming from.</clip>
          <div className="more">
          <br/><clip>I hear what you’re saying. I agree about... I also see...</clip>
          <br/><clip>I think I see where you're coming from.</clip> This is a
          great place to start asking clarifying questions, and eventually
          "I statements."
          <br/><clip>I think I see what you're getting at</clip>
          <br/><clip>Interesting</clip>

          </div>
        </div>

        <div id="cbb-1" title="go farther inward questions" 
            className="sg sgsm question">How would you define... ?
          <div className="more">
          <clip>Tell me more about ... </clip>,
          <clip>What do you mean by ...</clip> (Be careful that you are
          curious, and sound curious — don't use this as a loaded
          question!) <clip>Tell me more about ... </clip>
          Get into the details of their statement. It's important — and
          not always easy — to sound curious instead of accusatory. Asking
          about a specific word-choice can sometimes make an issue more clear.
          Get people to talk past their sound-bites!
          Suggested reading: Powerful Nondefensive Communications.
          </div>
        </div>
        <div id="cbb-1" title="go farther outward questions" 
            className="sg sgrt question"><clip>What makes this issue important
          for you?</clip>
          <div className="more">
          <clip>What are your hopes, what are your fears?</clip>
          Get into the details of their statement. It's important — and
          not always easy — to sound curious instead of accusatory. Asking
          about a specific word-choice can sometimes make an issue more clear.
          Get people to talk past their sound-bites!
          Suggested reading: Powerful Nondefensive Communications.
          </div>
        </div>


        <div id="activeListeing" className="sg sgsm active-listening" title=
            "Active Listening">
        <clip>Correct me if I'm wrong, for you this issue ...</clip></div>
        <div id="cbb-2"  className="sg sgrt agree">Good point...</div>
        <div id="cbb-2"  className="sg sgsm agree"><clip>This issue stresses me out too.</clip>
          <div className="more">
            Finding something you agree on is a powerful way to make
            conversations more civil, and open the possibility that might
            agree back.
            Often if you can't agree about anything else, you can agree
            that the issue is stressful.
          </div>
        </div>

        <div id="cbb-3" className="sg sgrt question">What made you aware of this problem?</div>

       <div id="cbb-4" className="sg sgrt personal">Want to talk about this in person?</div>

        <div className="sg adv">
          <div className="more">
            <clip>I'm experimenting with tips to make my political
            conversations saner and more civil. I can pop up tips
            right in my comment boxes:
            from the Comment Better Button.</clip>
          </div>
        </div>

      </div>
    </li>
    <li id="p2" onClick={this.showThisTab}>Group <br/>& Frame
      <div className="cbbContent">
        <div id="cbb-1" className="sg sgrt question">Observations.
          <div className="more">
            Share what you observe, rather than your conclusion.
            If you are talking about minimum wage, saying
            "People are working full time jobs and not earning a living.
            This seems unfair to me" is the important part of what you need
            to say, the part that can be talked about; once you state the
            conclusion, people can argue against that conclusion from
            any direction.
          </div>
        </div>
        <div id="cbb-1" className="sg group gladiator"><clip>I don't see this as left vs.
          right,
          but as ordinary people vs. those who'd take our democracy away.</clip>
          <div className="more">

            <clip>Yes, I have a different opinion than you  on this issue,
            that's democracy,
             but I think we should
            re-focus on corruption, which is widespread in DC across left
            and right, and not widespread among ordinary liberals and
            conservatives.
            </clip>

          </div>
        </div>


         <div id="cbb-1" className="sg tactic">Fairness: Tit-for-Tat
          <div className="more">
            In competitive sports, you win points. In a conversation, give and
            take. Is your post an argument or a conversation? Seek all
            the places where you can agree — give them points.
            In your own mind, what is the
            one point you most hope they will give you?
          </div>
        </div>

       <div id="cbb-1" className="sg question sgrt">Avoid conclusions.
          <div className="more">
            Conclusions are often markers of team identity. Explain why
            you believe what you believe, and let people draw their own
            conclusions.
          </div>
        </div>

         <div id="cbb-5" className="sg sgsm advice i-statements">"My experience was ..."          <div className="more">I statements let you hold your values with disagreeing. <clip>People I've met who were receiving food stamps worked hard and really needed the help.</clip> I don't expect politicians to lead saintly lives. Whether I agreed with their politics or not, <clip>I would draw the line ...  Where would you draw it?</clip> </div>
        </div>
 
        <div className="sg adv">
          <div className="more">
            <clip>Do you feel like politics on facebook is wedging our
            country apart? I get tips on bringing us back together
            from the Comment Better Button.</clip>
          </div>
        </div>

      </div>
    </li>
    <li id="p3" onClick={this.showThisTab}>Conflict <br/>& Trolls
      <div className="cbbContent">
       <div id="cbb-1" className="sg advice">Hold the Middle
          <div className="more">
            "I statements" and strong beliefs are powerful in reasonable
            conversations — share your heart. But when
            facing hate, make it everyone together
            against the hate. Don't let trolls represent 50% of the country
            while you represent the other 50%.
          </div>
        </div>

        <div id="cbb-1" className="sg group gladiator"><clip>I feel like we here
          are gladiators,
          decent people fighting while the emperor laughs in the stands.</clip>
          <div className="more">
          </div>
        </div>

        <div id="cbb-1" className="sg group gladiator"><clip>I doubt this
          view represents most ...</clip>
          <div className="more">
            If you are on one side, and someone from the other side says
            something disgusting, it's easy to attack the other side for it.
            This tends to boost trolls into positions of leadership.
            It's usually better to hold a wide center against outrageous
            behavior — let 90% of the "other side" agree with you, instead
            of circling their wagons around the troll.
          </div>
        </div>




        <div id="cbb-1" className="sg sgsm advice">Echo Messengers
          <div className="more">
            Find people that most of your audience sees as on "their side"
            and echo their messages. Don't try to "own" their message,
            to score points off it. Just get it out there.
          </div>
        </div>
        <div id="cbb-1" className="sg sgrt advice">Repetition
          <div className="more">
            Hateful ideas and bullying often rely on the feeling that the
            group is together. Piling on "I statements" of decency
            and compassion, rather than trying to argue, is an effective
            tactic.
            <clip>That crosses a line for me. I would never vote for a
            politician who did that, whether I liked their policies or
            not</clip>
            Note that using messengers and repetition never lets you "win"
            a particular encounter. If you can imagine winning, you're 
            problably not being effective!
          </div>
        </div>
        <div id="cbb-1" className="sg sgsm personal">Avoid stale anger
          <div className="more">
            Not every political conversation is sunlight and roses.
            We don't encourage you to put up with abuse.
            Keep it personal: don't get angry at someone for something
            someone else did. If someone is rude to you, it weakens
            your anger to say "all ___ are rude." Stay in the moment,
            talk only about what they did and what they could do.
          </div>
        </div>
        <div className="sg personal sgrt">Conversation Permissions: <clip>Do you want to talk politics</clip>
          <div className="more">
            Political conversations are often adversarial. Asking consent
            before talking politics can help. So can giving people permission
            to give you feedback: <clip>What do you think of this?</clip>
            invites someone to converse, rather than feel like they are
            attacking you if they see something else.
          </div>
        </div>

        <div className="sg adv">
          <div className="more">
            <clip>Do you feel like politics on facebook is wedging our
            country apart? I get tips on bringing us back together
            from the Comment Better Button. It's a free Chrome extension —
            get it <a>here!</a></clip>
          </div>
        </div>


      </div>
    </li>

    <li onClick={this.showThisTab} id="questions" title="Ask yourself before posting.">?
      <div className="cbbContent">
        <div className="sg personal">Who's your audience? Your goal?
          <div className="more">
            Are you hoping to avoid an argument with a relative without
            silencing yourself? Are you hoping to change someone's mind
            through conversation? Or convince people listening to your
            exchange? 
          </div>  
        </div>
        <div className="sg personal">What can you ask about?
          <br/>Their values: _______________________
          <br/>How they learned: ___________________
          <br/>Their priorities: ___________________
          <div className="more">
            We recommend Jonathan Haidt's <em>The Righteous Mind</em>
            to explore some common ways that good people see the world
            in different ways — asking questions as if these
            values may differ can be a good way for liberals and conservatives
            tease out better understandings.
          </div>
        </div>

        <div className="sg personal">What are your metaphors?
          <br/>Issue: _______________________
          <br/>Conversation: ________________
          <div className="more">
            Issues have metaphors: tax <em>relief</em> uses an underlying 
            metaphor that taxes are a disease or affliction. 
          </div>
        </div>

        <div className="sg personal">Can you win this conversation?
          <div className="more">
            If you can imagine them finally realizing that you are right
            and they are wrong and you are the source of truth — you 
            probably won't get anywhere. Have a conversation, not a 
            struggle that has a winner!
          </div>
        </div>

      </div>
    </li>

    <li onClick={this.showThisTab} id="cp" title="Cognitive Politics Social Media Guide">
      <div className="cbbContent">
        <div className="sg personal">2 Metaphors: the conversation and the issue.
          <div className="more">
            Do you fire facts like artillery while the
            defender hides in trenches? Is it a competitive sport, a connection,
            a mutual journey, a session of story-telling and listening?
            <br/><br/>Are taxes an affliction we need relief from, or
            how we pay teachers? Do families or illegals cross borders
            without the right paperwork?
          </div>
        </div>
        <div className="sg personal">Orthogonal Values: Compassion, Fairness, Freedom, Loyalty, Leadership/Followership, Sanctity.
          <div className="more">
            Many communication techniques encourage asking questions.
            Consider asking about the underlying values. For many political
            issues, we argue with other people, but the conversations miss.
            We don't really disagree, but are coming from different directions.
            "You prioritize this, and I prioritize that."
          </div>
        </div>

        <div className="sg personal">Active listening: Steelman.
          <div className="more">
          Describe the other side's points
          more clearly than they do. If false accusations are being made
          by your side, stepping in allows wavering voters to see you
          as the reasonable person.
          </div>
        </div>


        <div className="sg personal">Big-Tent Tension:
          <div className="more">
          For your points, express
          your heart fullyi (I statements),
          but also make sure that people can be on your
          side if they agree with you at all. Show your inner fire,
          but welcome everyone. Avoid shame, it is incredibly destructive.
          </div>
        </div>
        <div className="sg personal">Cascade, Don't Conclude.
          <div className="more">
          Figure out why you believe what you do. And stop there.
          Share the observations that led you to your beliefs, and stop
          there. Don't impose your will.
          </div>
        </div>
        <div className="sg personal">End with a Request
          <div className="more">
          Most political conversations end with an implied "kneel before
          my superior wisdom, admit you were wrong and I was right."
          Doesn't work. Ask to keep talking, ask to both challenge corruption
          within your own side, ask to read a book together. Good conversations
          can be continued this way, and bad conversations can be gently
          cut off when people are too lazy to read what you request.
          </div>
        </div>
        <div className="sg personal">Conversation Permissions. <clip>Do you want to talk politics</clip>
          <div className="more">
            Political conversations are often adversarial. Asking consent
            before talking politics can help. So can giving people permission
            to give you feedback: <clip>What do you think of this?</clip>
            invites someone to converse, rather than feel like they are
            attacking you if they see something else.
          </div>
        </div>
       Based on <a href="http://cognitivepolitics.org">Cognitive Politics</a>,
        this method is conscious of framing, intended to pull an audience.
        Here, in another format:
1)  Find ways to get people talking. Ask them questions that don't sound loaded, that push them past their soundbites: if stuck get a microscope (PNDC) or telescope (ask about overall vision for the country, what values are at stake).  Figure out which Moral Foundation Theory values are present for them (this can help you generate good questions, in NVC terms questions about needs rather than strategies.)
2) Active listen merged with agreeing with everything you can and steelman the other side.
3) "I statements" and observations that lead toward an unstated conclusion. This is when you include your frame.
4) A request at the end, different from the assumed request in politics ("Admit that I am and have always been right, and you have been wrong). "I hope we can keep talking." "I would love to read a book about this with you, and go deeper."

      </div>



    </li>
    <li onClick={this.showThisTab} id="rcc" title="Radical Civility Cycle">
      <div className="cbbContent">
        <div className="sg personal bottom whitetext">
          <a href="https://www.facebook.com/groups/smartly/">Join a Facebook community that teaches Radical Civility.</a>
        </div>
      </div>
    </li>
  </ul></div>
</div>
    );
  }
}
